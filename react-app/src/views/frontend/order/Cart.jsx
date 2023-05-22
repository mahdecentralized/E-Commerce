import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function Cart() {

   document.title = 'Cart';
   var view_cart = '';
   var total = 0;
   const redirect = useNavigate();
   const [loading, setLoading] = useState(true);
   const [cart, setCart] = useState([]);

   if (!localStorage.getItem('auth_token')) {
      swal('Warning', 'Unauthorized!', 'warning');
      redirect('/');
   }

   // View Cart
   useEffect(() => {
      axios.get(`/api/view-cart`).then(res => {

         if (res.data.status === 200) {
            setCart(res.data.cart);
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

         setLoading(false);

      });
   }, []);

   // Quantity Decrement
   const handleDecrement = (cart_id) => {
      setCart(cart =>
         cart.map(item =>
            cart_id === item.id ? { ...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1 : 0) } : item
         )
      );
      updateQuantity(cart_id, 'dec');
   }

   // Quantity Increment
   const handleIncrement = (cart_id) => {
      setCart(cart =>
         cart.map(item =>
            cart_id === item.id ? { ...item, product_quantity: item.product_quantity + (item.product_quantity < item.product.quantity ? 1 : 0) } : item
         )
      );
      updateQuantity(cart_id, 'inc');
   }

   // Update Cart (Quantity)
   const updateQuantity = (cart_id, scope) => {
      axios.put(`/api/update-quantity/${cart_id}/${scope}`).then(res => {

         if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
         }

      });
   }

   // Delete Cart
   const deleteCart = (e, cart_id) => {

      e.preventDefault();

      let clicked = e.currentTarget;
      clicked.innerText = 'Removing..';

      axios.delete(`/api/delete-cart/${cart_id}`).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            clicked.closest('tr').remove();
            window.location.reload();
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            clicked.innerText = 'Remove';
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
         }

      });
   }

   if (loading) {
      return <Loading />;
   }

   // Cart Data
   if (cart.length > 0) {
      view_cart =
         <div>
            <table className='table table-dark table-bordered text-center table-striped'>
               <thead>
                  <tr>
                     <th>Image</th>
                     <th>Product</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Total Price</th>
                     <th>Remove</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     cart.map(item => {
                        total += item.product.selling_price * item.product_quantity;
                        return (
                           <tr key={item.id}>
                              <td className='py-1'>
                                 <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width='50px' />
                              </td>
                              <td>{item.product.name}</td>
                              <td>${item.product.selling_price}</td>
                              <td className='btn-group-sm rounded-0 border-0'>
                                 <button type='button' onClick={() => handleDecrement(item.id)} className='btn btn-outline-light mx-2 border-0'>-</button>
                                 <button disabled className='btn btn-outline-light mx-2 border-0'>{item.product_quantity}</button>
                                 <button type='button' onClick={() => handleIncrement(item.id)} className='btn btn-outline-light mx-2 border-0'>+</button>
                              </td>
                              <td>${item.product.selling_price * item.product_quantity}</td>
                              <td>
                                 <button type='button' onClick={(e) => deleteCart(e, item.id)} className='btn btn-danger btn-sm'>
                                    <i className='bi bi-trash'></i> Remove
                                 </button>
                              </td>
                           </tr>
                        );
                     })
                  }
               </tbody>
            </table>
            <div className='card d-flex text-bg-dark card-body border-light rounded-1 w-25' >
               <h5>
                  Grand Total:
                  <span> ${total}</span>
               </h5>
               <hr />
               <Link to='/checkout' className='btn btn-primary btn-sm'>Checkout</Link>
            </div>
         </div>
   } else {
      view_cart =
         <h4>Your shopping cart is empty.</h4>
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>Cart</h4>
            </div>
            <div className='card-body py-5'>
               {view_cart}
            </div>
         </div>
      </div>
   );

}
