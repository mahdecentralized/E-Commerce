import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../components/assets/loading/Loading'


export default function ViewProduct() {

   document.title = 'View Products';
   var view_products = '';
   var view_status_product = '';
   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);

   // View Products
   useEffect(() => {
      axios.get(`/api/admin/view-products`).then(res => {

         if (res.data.status === 200) {
            setProducts(res.data.products);
         }

         setLoading(false);

      });
   }, []);

   if (loading) {
      return <Loading />;
   }
   // Products Data
   if (products.length > 0) {
      view_products = products.map(item => {

         if (item.status == '0') {
            view_status_product = 'Shown';
         } else if (item.status == '1') {
            view_status_product = 'Hidden';
         }

         return (
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.category.name}</td>
               <td>{item.name}</td>
               <td>${item.selling_price}</td>
               <td>
                  <img src={`http://localhost:8000/${item.image}`} width='50px' height='40px' alt={item.name} />
               </td>
               <td>{view_status_product}</td>
               <td>
                  <Link to={`/admin/edit-product/${item.id}`} className='btn btn-warning btn-sm'>
                     <i className="bi bi-pencil-square"></i> Edit
                  </Link>
               </td>
            </tr>
         );
      });
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>
                  Products List
                  <Link to='/admin/add-product' className='btn btn-light btn-sm float-end'>
                     <i className="bi bi-plus-circle"></i> Add Product
                  </Link>
               </h4>
            </div>
            <div className='card-body mt-4'>
               <table className='table table-dark table-bordered text-center table-striped'>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Product Name</th>
                        <th>Selling Price</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Edit</th>
                     </tr>
                  </thead>
                  <tbody>
                     {view_products}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
   
}
