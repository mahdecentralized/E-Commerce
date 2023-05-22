import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function AddAddress() {

   document.title = 'Edit Address';
   const redirect = useNavigate();
   const address_id = useParams();
   const [loading, setLoading] = useState(true);
   const [errors, setErrors] = useState([]);
   const [address, setAddress] = useState([]);

   if (!localStorage.getItem('auth_token')) {
      swal('Warning', 'Unauthorized!', 'warning');
      redirect('/');
   }

   // View Address/id
   useEffect(() => {
      axios.get(`/api/edit-address/${address_id.id}`).then(res => {

         if (res.data.status === 200) {
            setAddress(res.data.address);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/view-addresses');
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

         setLoading(false);

      });
   }, [address_id.id]);

   // Get Input Value
   const handleInput = (e) => {
      e.persist();
      setAddress({ ...address, [e.target.name]: e.target.value });
   }

   // Update Address
   const updateAddress = (e) => {

      e.preventDefault();

      const data = address;

      axios.post(`/api/update-address/${address_id.id}`, data).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/view-addresses');
            setErrors([]);
         } else if (res.data.status === 400) {
            swal('Fill in the mandatory fiealds.', '', 'error');
            setErrors(res.data.errors);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/view-addresses');
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/view-addresses');
         }

      });
   }

   if (loading) {
      return <Loading />;
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3 bg-dark-1' style={{ backgroundColor: '#363e47' }}>
               <h4>
                  Edit Address
                  <Link to='/view-addresses' className='float-end'>
                     <i className='bi bi-arrow-return-left nav-link text-white'></i>
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               <div className='container-fluid'>
                  <form onSubmit={updateAddress}>
                     <div className='row'>

                     <div className='col-md-6'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.first_name} type='text' name='first_name' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>First Name</label>
                              <span className='text-danger'>{errors.first_name}</span>
                           </div>
                        </div>

                        <div className='col-md-6'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.last_name} type='text' name='last_name' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Last Name</label>
                              <span className='text-danger'>{errors.last_name}</span>
                           </div>
                        </div>

                        <div className='col-md-6'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.phone} type='number' name='phone' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Phone Number</label>
                              <span className='text-danger'>{errors.phone}</span>
                           </div>
                        </div>

                        <div className='col-md-6'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.email} type='email' name='email' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Email Address</label>
                              <span className='text-danger'>{errors.email}</span>
                           </div>
                        </div>

                        <div className='col-md-12'>
                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={address.address} type='text' name='address' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Full Address</label>
                              <span className='text-danger'>{errors.address}</span>
                           </div>
                        </div>

                        <div className='col-md-4'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.city} type='text' name='city' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>City</label>
                              <span className='text-danger'>{errors.city}</span>
                           </div>
                        </div>

                        <div className='col-md-4'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.state} type='text' name='state' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>State</label>
                              <span className='text-danger'>{errors.state}</span>
                           </div>
                        </div>

                        <div className='col-md-4'>
                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={address.zip_code} type='number' name='zip_code' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Zip Code</label>
                              <span className='text-danger'>{errors.zip_code}</span>
                           </div>
                        </div>

                        <div>
                           <button type='submit' className='btn btn-primary mt-3 px-5'>Update</button>
                        </div>

                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
   
}
