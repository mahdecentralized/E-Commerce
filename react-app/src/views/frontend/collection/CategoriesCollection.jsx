import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../components/assets/loading/Loading'


export default function CategoriesCollection() {

   document.title = 'Categoies Collection';
   var view_categories = '';
   const [loading, setLoading] = useState(true);
   const [categories, setCategories] = useState([]);

   // View Categories
   useEffect(() => {
      axios.get(`/api/categories-collection`).then(res => {

         if (res.data.status === 200) {
            setCategories(res.data.categories);
         }

         setLoading(false);

      });
   });

   if (loading) {
      return <Loading />;
   }

   // Categories Data
   if (categories.length > 0) {
      view_categories = categories.map(item => {
         if (item.status === 0) {
            return (
               <div className='col-md-2 text-center' key={item.id}>
                  <Link to={`/collections/${item.slug}`} className='nav-link card'>
                     <button className='btn btn-light p-3 fs-5'>{item.name}</button>
                  </Link>
               </div>
            );
         }
      });
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>Collections</h4>
            </div>
            <div className='card-body rounded-1 py-5'>
               <div className='row'>
                  {view_categories}
               </div>
            </div>
         </div>
      </div>
   );
   
}
