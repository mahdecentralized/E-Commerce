import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function ProductsCollection() {

   document.title = 'Products Collection';
   var view_product = '';
   const redirect = useNavigate();
   const product_slug = useParams();
   const [loading, setLoading] = useState(true);
   const [category, setCategory] = useState([]);
   const [products, setProducts] = useState([]);

   // View Products/slug
   useEffect(() => {
      axios.get(`/api/products-collection/${product_slug.slug}`).then(res => {

         if (res.data.status === 200) {
            setProducts(res.data.product_data.products);
            setCategory(res.data.product_data.category);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/collections');
         }
         
         setLoading(false);

      });
   }, [product_slug.slug]);

   if (loading) {
      return <Loading />;
   }

   // Product Data
   if (products.length > 0) {
      view_product = products.map(item => {
         if (item.category.status == 0 && item.quantity > 0) {
            return (
               <Link to={`/collections/${item.category.slug}/${item.slug}`} key={item.id} className='bg-white nav-link rounded-2 py-3 px-4 col-md-4 d-flex flex-column justify-content-between align-items-start gap-4' style={{ width: '300px', height: '380px' }}>
                  <img src={`http://localhost:8000/${item.image}`} alt={item.name} className='rounded-2' width='250px' style={{maxHeight: '250px'}} />
                  <div>
                     <h5 className='text-truncate d-inline-block text-dark' style={{ maxWidth: '250px' }}>{item.name}</h5>
                     <h5 className='text-dark mb-0'>${item.selling_price}</h5>
                     <h6 className='text-muted text-decoration-line-through'>${item.orginal_price}</h6>
                  </div>
               </Link>
            );
         } else if (item.category.status == 0 && item.quantity == 0) {
            return (
               <Link to={`/collections/${item.category.slug}/${item.slug}`} key={item.id} className='bg-white opacity-75 nav-link border rounded-2 py-3 px-4 col-md-4 d-flex flex-column justify-content-between align-items-start gap-4' style={{ width: '300px', height: '380px' }}>
                  <img src={`http://localhost:8000/${item.image}`} alt={item.name} className='rounded-2' width='250px' style={{maxHeight: '250px'}} />
                  <div className='w-100'>
                     <h5 className='text-truncate d-inline-block text-dark' style={{ maxWidth: '250px' }}>{item.name}</h5>
                     <span className='badge rounded-pill text-bg-danger d-block'>Out of Stock</span>
                  </div>
               </Link>
            );
         }
      });
   } else {
      view_product =
         <div className='col-md-12'>
            <h4>There is no product for {category.name} at the moment.</h4>
         </div>
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h5>
                  Collection / {category.name}
                  <Link to={'/collections'} className='float-end'>
                     <i className='bi bi-arrow-return-left nav-link text-white'></i>
                  </Link>
               </h5>
            </div>
            <div className='card-body rounded-1 py-5'>
               <div className='row justify-content-center gap-3'>
                  {view_product}
               </div>
            </div>
         </div>
      </div>
   );
   
}
