import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'


export default function Register() {

   document.title = 'Register';
   const redirect = useNavigate();
   const [errors, setErrors] = useState([]);
   const [register, setRegister] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: ''
   });

   // Get Inputs Value
   const handleInput = (e) => {
      e.persist();
      setRegister({ ...register, [e.target.name]: e.target.value });
   }

   // Register
   const registerSubmit = (e) => {

      e.preventDefault();

      const data = {
         first_name: register.first_name,
         last_name: register.last_name,
         email: register.email,
         phone: register.phone,
         password: register.password,
         password_confirmation: register.password_confirmation
      }

      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post(`/api/register`, data).then(res => {

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
               <h4>Register</h4>
            </div>
            <div className='card-body py-4'>
               <div className='container-fluid' style={{ width: '450px' }}>
                  <form onSubmit={registerSubmit} >

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.last_name} type='text' name='last_name' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Last Name</label>
                        <span className='text-danger'>{errors.last_name}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.first_name} type='text' name='first_name' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>First Name</label>
                        <span className='text-danger'>{errors.first_name}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.email} type='email' name='email' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Email Address</label>
                        <span className='text-danger'>{errors.email}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.phone} type='number' name='phone' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Phone Number</label>
                        <span className='text-danger'>{errors.phone}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.password} type='password' name='password' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Password</label>
                        <span className='text-danger'>{errors.password}</span>
                     </div>

                     <div className='form-floating mb-3'>
                        <input onChange={handleInput} value={register.password_confirmation} type='password' name='password_confirmation' className='form-control bg-dark text-light' autoComplete='off' />
                        <label className='text-muted'>Password Confirmation</label>
                        <span className='text-danger'>{errors.password}</span>
                     </div>

                     <button type='submit' className='btn btn-primary my-3 w-100'>Register</button>

                     <p className='text-center text-muted'>
                        Aearly registered? <Link className='text-decoration-none' to='/login'>Login</Link>.
                     </p>

                  </form>
               </div>
            </div>
         </div>
      </div>
   );

}
