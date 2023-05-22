import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

export default function Navbar() {

   var AuthButton = '';
   var AdminButton = '';
   const redirect = useNavigate();
   const [user, setUser] = useState([]);

   // View User
   useEffect(() => {
      axios.get(`/api/view-user-details`).then(res => {

         if (res.data.status === 200) {
            setUser(res.data.user);
         }

      });
   }, []);

   // Logout
   const logoutSubmit = (e) => {

      e.preventDefault();

      axios.post(`/api/logout`).then(res => {

         if (res.data.status === 200) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            swal('Success', res.data.message, 'success');
            redirect('/');
            window.location.reload();
         }

      });

   }

   // Role as Admin
   if (user.role_as === 1) {
      AdminButton =
         <Link className='dropdown-item px-2' to='/admin'>
            <i className='bi bi-speedometer2'></i> Dashboard
         </Link>
   }

   // After Logout
   if (!localStorage.getItem('auth_token')) {
      AuthButton =
         <Link className='navbar-brand text-light' to='/login'>Login | Register</Link>
   }

   // Role as User
   else {
      AuthButton =
         <div className='dropdown d-flex justify-content-center gap-3 align-items-center'>
            
            <div>
               <div className='dropdown-toggle fs-5 text-light' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                  <i className='bi bi-person fs-2'></i>
               </div>
               <ul className='dropdown-menu dropdown-menu-dark' style={{ left: '-50px' }}>

                  {AdminButton}

                  <Link className='dropdown-item px-2' to='/profile'>
                     <i className='bi bi-pencil-square'></i> {user.first_name} {user.last_name}
                  </Link>

                  <Link className='dropdown-item px-2' to='/view-addresses'>
                     <i className='bi bi-geo-alt'></i> Addresses
                  </Link>

                  <Link className='dropdown-item px-2' to='/view-orders'>
                     <i className='bi bi-bag'></i> Orders
                  </Link>

                  <hr className='my-0' />

                  <Link onClick={logoutSubmit} className='dropdown-item px-2 text-danger'>
                     <i className='bi bi-box-arrow-left'></i> Logout
                  </Link>

               </ul>
            </div>

            <Link className='navbar-brand position-relative fs-3' to='/cart'>
               <i className='bi bi-cart text-light'></i>
            </Link>

         </div>
   }

   return (
      <nav className='navbar sticky-top py-3 shadow-sm position-fixed w-100 bg-dark-1'>
         <div className='d-flex align-items-center justify-content-between w-100 px-5'>
            <div>
               <Link className='navbar-brand text-light fs-4 fw-bold ps-2 pe-4 border-end border-1' to='/home'>E-Commerce</Link>
               <Link className='navbar-brand text-light px-1' to='/collections'>Collections</Link>
            </div>
            <div>
               {AuthButton}
            </div>
         </div>
      </nav>
   );

}
