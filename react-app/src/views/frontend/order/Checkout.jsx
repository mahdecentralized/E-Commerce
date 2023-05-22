import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function Checkout() {

   document.title = 'Checkout';
   var view_addresses = '';
   var view_checkout = ''
   const redirect = useNavigate();
   const [loading, setLoading] = useState(true);
   const [errors, setErrors] = useState([]);
   const [addresses, setAddresses] = useState([]);
   const [cart, setCart] = useState([]);
   const [checkout, setCheckout] = useState({
      address_id: '',
   });

   if (!localStorage.getItem('auth_token')) {
      swal('Warning', 'Unauthorized!', 'warning');
      redirect('/');
   }

   useEffect(() => {
      // View Cart
      axios.get(`/api/view-cart`).then(res => {

         if (res.data.status === 200) {
            setCart(res.data.cart);
         } else if (res.data.status === 401) {
            swal('Warning', res.data.error, 'warning');
            redirect('/');
         }

         setLoading(false);

      });

      // View Address
      axios.get(`/api/view-addresses`).then(res => {

         if (res.status === 200) {
            setAddresses(res.data.addresses);
            setErrors([]);
         } else if (res.data.status === 401) {
            swal('Warning', res.data.error, 'warning');
            redirect('/');
         }

         setLoading(false);

      });
   }, []);


   // Get Inputs Value
   const handleSelect = (e) => {
      e.persist();
      setCheckout({ ...checkout, [e.target.name]: e.target.value });
   }


   // Place Order
   const submitOrder = (e) => {

      e.preventDefault();

      const data = {
         address_id: checkout.address_id,
      }

      axios.post(`/api/place-order`, data).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/');
         } else if (res.data.status === 400) {
            setErrors(res.data.errors);
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

      });

   }

   if (loading) {
      return <Loading />;
   }

   // Address Data
   if (addresses.length > 0) {
      view_addresses =
         <form className='needs-validation'>
            <div className='form-floating mb-3'>
               <select onChange={handleSelect} value={checkout.address_id} name='address_id' id='select' className='form-select text-light bg-dark'>
                  <option></option>
                  {
                     addresses.map(item => {
                        return (
                           <option selected value={item.id} key={item.id}>
                              {item.first_name} {item.last_name}, {item.phone}, {item.email}, {item.address}, {item.city}, {item.state}, {item.zip_code}
                           </option>
                        );
                     })
                  }
               </select>
               <label className='text-muted' for='select'>Select Address</label>
               <span className='text-danger'>{errors.address_id}</span>
            </div>
            <button type='submit' onClick={submitOrder} className='btn btn-primary px-5'>Place Order</button>
         </form>
   } else if (addresses.length == 0) {
      view_addresses =
         <div>
            <h4 className='pb-3'>You have no address.</h4>
            <h6>Please add an address to place order.</h6>
         </div>
   }

   // Cart Data 
   if (cart.length > 0) {
      view_checkout =
         <div className='container'>
            <div className='card text-bg-dark border-light rounded-1'>
               <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
                  <h4>
                     Address
                     <Link to='/add-address' className='btn btn-light btn-sm float-end'>
                        <i className='bi bi-plus-circle'></i> Add Address
                     </Link>
                  </h4>
               </div>
               <div className='card-body rounded-1 pt-4'>
                  {view_addresses}
               </div>
            </div>
            <div className='card-body rounded-1 ps-0 mt-3 w-50'>
               {
                  cart.map(item => {
                     return (
                        <div className='border rounded-2 p-3' key={item.id}>
                           <div>
                              <span>Product Name:</span> <span className='fs-5'>{item.product.name}</span>
                           </div>
                           <div>
                              <span>Price:</span> <span className='fs-5'>${item.product.selling_price}</span>
                           </div>
                           <div>
                              <span>Quantity:</span> <span className='fs-5'>{item.product_quantity}</span>
                           </div>
                           <div>
                              <span>Grand Total:</span> <span className='fs-5'>${item.product.selling_price * item.product_quantity}</span>
                           </div>
                        </div>
                     );
                  })
               }
            </div>
         </div>
   } else {
      view_checkout =
         <h4>Your shopping cart is empty.</h4>
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>
                  Checkout
                  <Link to={'/cart'} className='float-end'>
                     <i className='bi bi-arrow-return-left nav-link text-white'></i>
                  </Link>
               </h4>
            </div>
            <div className='card-body rounded-1 py-5'>
               {view_checkout}
            </div>
         </div>
      </div>
   );
}
