import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading';


export default function Profile() {

   document.title = 'Profile';
   var delete_button = '';
   const redirect = useNavigate();
   const [loading, setLoading] = useState(true);
   const [errors, setErrors] = useState([]);
   const [picture, setPicture] = useState([]);
   const [user, setUser] = useState({
      first_name: '',
      last_name: ''
   });

   // Get Inputs Value
   const handleInput = (e) => {
      e.persist();
      setUser({ ...user, [e.target.name]: e.target.value });
   }

   // Get Image Value
   const handleImage = (e) => {
      setPicture({ image: e.target.files[0] });
   }

   // Edit Profile
   useEffect(() => {
      axios.get(`/api/edit-profile`).then(res => {

         if (res.data.status === 200) {
            setUser(res.data.user);
         } else if (res.data.status === 401) {
            swal('Warnig', res.data.warning, 'warning');
            redirect('/');
         }

         setLoading(false);

      });
   }, []);

   // Update Profile
   const updateProfile = (e) => {

      e.preventDefault();

      const data = new FormData();

      data.append('first_name', user.first_name);
      data.append('last_name', user.last_name);
      data.append('image', picture.image);

      axios.post(`/api/update-profile`, data).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/');
            setErrors([]);
            window.location.reload();
         } else if (res.data.status === 400) {
            swal('Fill in the mandatory fiealds.', '', 'error');
            setErrors(res.data.errors);
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

      });
   }

   // Delete Profile Image
   const deleteImage = (e) => {

      e.preventDefault();

      axios.post(`/api/delete-profile-image`).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/');
            clicked.closest('button').remove();
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

      });

   }

   if (loading) {
      return <Loading />;
   }

   if (user.image != 'uploads/default/user.png') {
      delete_button =
         <Link>
            <i onClick={(e) => deleteImage(e)} className='bi bi-trash-fill text-danger fs-5 position-absolute' style={{ top: '100px', left: '30px' }}></i>
         </Link>
   }

   return (
      <div className='container' style={{ width: '600px' }}>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>Edit Profile</h4>
            </div>
            <div className='card-body px-5 mt-4'>
               <form onSubmit={updateProfile} encType='multipart/form-data'>

                  <div className='form-group mb-3'>
                     <img src={`http://localhost:8000/${user.image}`} className='rounded-circle position-relative border border-2 border-light' width='70px' height='70px' />
                     {delete_button}
                  </div>

                  <div className='form-group mb-3'>
                     <input onChange={handleImage} type='file' name='image' className='form-control bg-dark text-light' />
                     <span className='text-danger'>{errors.image}</span>
                  </div>

                  <div className='form-floating mb-3'>
                     <input onChange={handleInput} value={user.first_name} type='text' name='first_name' className='form-control bg-dark text-light' autoComplete='off' />
                     <label className='text-muted'>First Name</label>
                     <span className='text-danger'>{errors.first_name}</span>
                  </div>

                  <div className='form-floating mb-3'>
                     <input onChange={handleInput} value={user.last_name} type='text' name='last_name' className='form-control bg-dark text-light' autoComplete='off' />
                     <label className='text-muted'>Last Name</label>
                     <span className='text-danger'>{errors.last_name}</span>
                  </div>

                  <div className='form-floating mb-3'>
                     <input onChange={handleInput} value={user.email} type='email' name='email' disabled className='form-control bg-dark text-light opacity-50' autoComplete='off' />
                     <label className='text-muted'>Email Address</label>
                     <span className='text-danger'>{errors.email}</span>
                  </div>

                  <div className='form-floating mb-3'>
                     <input onChange={handleInput} value={user.phone} type='number' name='phone' disabled className='form-control bg-dark text-light opacity-50' autoComplete='off' />
                     <label className='text-muted'>Phone Number</label>
                     <span className='text-danger'>{errors.phone}</span>
                  </div>

                  <button type='submit' className='btn btn-primary px-5 mb-3'>Update</button>

               </form>
            </div>
         </div>
      </div>
   );
}
