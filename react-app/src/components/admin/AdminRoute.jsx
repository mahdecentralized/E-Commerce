import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import Loading from '../assets/loading/Loading'


export default function AdminRoute() {

   const redirect = useNavigate();
   const [loading, setLoading] = useState(true);
   const [authenticated, setAuthenticated] = useState(false);

   // Check Role
   useEffect(() => {

      axios.get(`/api/admin/check`).then(res => {

         if (res.data.status === 200) {
            setAuthenticated(true);
            document.title = 'Admin';
         }

         setLoading(false);

      });

      return () => {
         setAuthenticated(false);
      }

   }, []);


   // Not Admin (after login or register)
   axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error) {

      if (error.response.status === 401) {
         swal('Unauthorized!', '', 'warning');
         redirect('/login');
      }

      return Promise.reject(error);

   });


   // Not Admin (before login or register)
   axios.interceptors.response.use(response => {

      return response;

   }, (error) => {

      if (error.response.status === 403) {
         swal('Forbidden!', '', 'warning');
         redirect('/');
      } else if (error.response.status === 404) {
         swal('Not Found.', '', 'error');
         redirect('/');
      }

      return Promise.reject(error);

   });

   // Loading
   if (loading) {
      return <Loading />;
   }

   return (
      <div className='sb-nav-fixed'>
         <div id='layoutSidenav'>
            <div id='layoutSidenav_nav'>
               <Sidebar />
            </div>
            <div className='mx-5' id='layoutSidenav_content'>
               <main>
                  {authenticated ? <Outlet /> : <Navigate to='/' />}
               </main>
            </div>
         </div>
      </div>
   );
   
}
