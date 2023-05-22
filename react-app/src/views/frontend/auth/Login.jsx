import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'


export default function Login() {

   document.title = 'Login';
   const redirect = useNavigate();
   const [errors, setErrors] = useState([]);
   const [login, setLogin] = useState({
      email: '',
      password: ''
   });

   // Get Inputs Value
   const handleInput = (e) => {
      e.persist();
      setLogin({ ...login, [e.target.name]: e.target.value });
   }

   // Login
   const loginSubmit = (e) => {

      e.preventDefault();

      const data = {
         email: login.email,
         password: login.password
      }

      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post(`/api/login`, data).then(res => {

            if (res.data.status === 200) {
               localStorage.setItem('auth_token', res.data.token);
               localStorage.setItem('auth_name', res.data.username);
               swal('Success', res.data.message, 'success');
               setErrors([]);

               if (res.data.role === 'admin') {
                  redirect('/admin/view-orders');
               } else {
                  redirect('/');
                  window.location.reload();
               }
            } else if (res.data.status === 401) {
               swal('Warning', res.data.warning, 'warning');
               setErrors([]);
            } else if (res.data.status === 400) {
               swal('Fill in the mandatory fiealds.', '', 'error');
               setErrors(res.data.errors);
            }

         });
      });
   }

   return (
      <div className='container' style={{ width: '600px' }}>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>Login</h4>
            </div>
            <div className='card-body py-4'>
               <div className='container-fluid' style={{ width: '450px' }}>
                  <form onSubmit={loginSubmit}>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={login.email} type='email' name='email' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Email Address</label>
                        <span className='text-danger'>{errors.email}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={login.password} type='password' name='password' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Password</label>
                        <span className='text-danger'>{errors.password}</span>
                     </div>

                     <button type='submit' className='btn btn-primary my-3 w-100'>Login</button>

                     <p className='text-center text-muted  fs-7'>
                        Not registered? <Link className='text-decoration-none' to='/register'>Create an account</Link>.
                     </p>

                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
