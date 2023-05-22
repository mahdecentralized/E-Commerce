import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../components/assets/loading/Loading'


export default function ViewCategories() {

   document.title = 'View Categories';
   var view_categories = '';
   var view_status_category = '';
   const [loading, setLoading] = useState(true);
   const [categories, setCategories] = useState([]);


   // View Categories
   useEffect(() => {
      axios.get(`/api/admin/view-categories`).then(res => {

         if (res.data.status === 200) {
            setCategories(res.data.categories);
         }

         setLoading(false);

      });
   }, []);


   if (loading) {
      return <Loading />;
   }
   // Categories Data
   if (categories.length > 0) {
      view_categories = categories.map(item => {

         if (item.status == '0') {
            view_status_category = 'Shown';
         } else if (item.status == '1') {
            view_status_category = 'Hidden';
         }

         return (
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.name}</td>
               <td>{item.slug}</td>
               <td>{view_status_category}</td>
               <td>
                  <Link to={`/admin/edit-category/${item.id}`} className='btn btn-warning btn-sm'>
                     <i className='bi bi-pencil-square'></i> Edit
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
                  Categories List
                  <Link to='/admin/add-category' className='btn btn-light btn-sm float-end'>
                     <i className='bi bi-plus-circle'></i> Add Category
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               <table className='table table-dark table-bordered text-center table-striped'>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Edit</th>
                     </tr>
                  </thead>
                  <tbody>
                     {view_categories}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );

}
