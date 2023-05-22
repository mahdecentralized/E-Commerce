import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function ProductDetails() {

   document.title = 'Product Details';
   var stock = '';
   const redirect = useNavigate();
   const product_slug = useParams();
   const category_slug = useParams();
   const [loading, setLoading] = useState(true);
   const [product, setProduct] = useState([]);
   const [quantity, setQuantity] = useState(1);

   // View Product/slug Details
   useEffect(() => {
      axios.get(`/api/view-product-details/${category_slug.category}/${product_slug.product}`).then(res => {

         if (res.data.status === 200) {
            setProduct(res.data.product);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/collections');
         }

         setLoading(false);

      });
   }, [category_slug.category, product_slug.product]);

   // Quantity Decrement
   const handleDecrement = () => {
      if (quantity > 1) {
         setQuantity(prevCount => prevCount - 1);
      }
   }

   // Quantity Increment
   const handleIncrement = () => {
      if (quantity < product.quantity) {
         setQuantity(prevCount => prevCount + 1);
      }
   }

   // Add Cart
   const submitAddToCart = (e) => {

      if (!localStorage.getItem('auth_token')) {
         swal('Warning', 'Unauthorized!', 'warning');
         redirect('/');
      }

      e.preventDefault();

      const data = {
         product_id: product.id,
         product_quantity: quantity
      }

      axios.post(`/api/add-cart`, data).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
         } else if (res.data.status === 409) {
            swal('Warning', res.data.warning, 'warning');
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
         }

      });
   }

   if (loading) {
      return <Loading />;
   }

   // Stock Data
   if (product.quantity > 0) {
      stock =
         <div>
            <div className='btn-group w-100 rounded-3 border border-light'>
               <button type='button' onClick={handleDecrement} class='btn btn-outline-light p-1 border-0'>-</button>
               <button disabled class='btn btn-outline-light p-1 border-0'>{quantity}</button>
               <button type='button' onClick={handleIncrement} class='btn btn-outline-light p-1 border-0'>+</button>
            </div>
            <span className='badge rounded-pill text-bg-success d-block my-3'>Stock: {product.quantity} pieces</span>
            <button type='button' onClick={submitAddToCart} className='btn btn-primary'>Add to cart</button>
         </div>
   } else {
      stock =
         <span className='badge rounded-pill text-bg-danger d-block'>Out of Stock</span>
   }

   return (
      <div className='container' style={{ width: '1000px' }}>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h6 className='text-white'>
                  Collection / {product.category.name} / {product.name}
                  <Link to={`/collections/${product.category.name}`} className='float-end'>
                     <i className='bi bi-arrow-return-left nav-link text-white'></i>
                  </Link>
               </h6>
            </div>
            <div className='card-body rounded-1 py-5'>
               <div className='row align-items-center justify-content-center text-center'>
                  <div className='col-md-6'>
                     <img src={`http://localhost:8000/${product.image}`} alt={product.name} className='rounded-2' width='300px' style={{maxHeight: '300px'}} />
                  </div>
                  <div className='col-md-6 border-start'>
                     <h4>{product.name}</h4>
                     <p className='text-warning'>{product.brand}</p>
                     <p className='text-truncate d-inline-block text-muted' style={{ maxWidth: '300px' }}>{product.description}</p>
                     <div className='d-flex flex-column align-items-center'>
                        <h4 className='mb-0'>${product.selling_price}</h4>
                        <h6 className='text-muted text-decoration-line-through pb-3'>${product.orginal_price}</h6>
                        {stock}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
   
}
