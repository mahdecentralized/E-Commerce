import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../components/assets/loading/Loading'


export default function Home() {

   document.title = 'E-Commerce';
   var view_products = '';
   const [loading, setLoading] = useState(true);
   const [product, setProducts] = useState([]);


   // View Products
   useEffect(() => {
      axios.get(`/api/frontend-view-products`).then(res => {

         if (res.data.status === 200) {
            setProducts(res.data.products);
         }

         setLoading(false);

      });
   }, []);

   if (loading) {
      return <Loading />;
   }

   // Product Data
   if (product.length > 0) {
      view_products = product.map(item => {
         if (item.status == 0 && item.category.status == 0 && item.quantity > 0) {
            return (
               <Link to={`/collections/${item.category.slug}/${item.slug}`} key={item.id} className='bg-white nav-link rounded-2 py-3 px-4 col-md-4 d-flex flex-column justify-content-between align-items-start' style={{ width: '300px', height: '380px' }}>
                  <img src={`http://localhost:8000/${item.image}`} alt={item.name} className='rounded-2' width='250px' style={{maxHeight: '250px'}} />
                  <div className='w-100'>
                     <h5 className='text-truncate d-inline-block' style={{ maxWidth: '250px' }}>{item.name}</h5>
                     <h5 className='mb-0'>${item.selling_price}</h5>
                     <h6 className='text-muted text-decoration-line-through'>${item.orginal_price}</h6>
                  </div>
               </Link>
            );
         } else if (item.status == 0 && item.category.status == 0 && item.quantity == 0) {
            return (
               <Link to={`/collections/${item.category.slug}/${item.slug}`} key={item.id} className='bg-white opacity-75 nav-link border rounded-2 py-3 px-4 col-md-4 d-flex flex-column justify-content-between align-items-start gap-4' style={{ width: '300px', height: '380px' }}>
                  <img src={`http://localhost:8000/${item.image}`} alt={item.name} className='rounded-2' width='250px' style={{maxHeight: '250px'}} />
                  <div className='w-100'>
                     <h6 className='text-truncate d-inline-block' style={{ maxWidth: '250px' }}>{item.name}</h6>
                     <span className='badge rounded-pill text-bg-danger d-block'>Out of Stock</span>
                  </div>
               </Link>
            );
         }
      });
   }

   return (
      <div className='container my-5'>
         <div className='row justify-content-center gap-3'>
            {view_products}
         </div>
      </div>
   );
}