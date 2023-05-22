import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function EditCategory() {

   document.title = 'Edit Category';
   const redirect = useNavigate();
   const category_id = useParams();
   const [loading, setLoading] = useState(true);
   const [errors, setErrors] = useState([]);
   const [checkbox, setCheckbox] = useState([]);
   const [category, setCategory] = useState({
      slug: '',
      name: '',
      description: '',
      status: '',
      meta_title: '',
      meta_keywords: '',
      meta_description: ''
   });

   // Get Input Value
   const handleInput = (e) => {
      e.persist();
      setCategory({ ...category, [e.target.name]: e.target.value });
   }

   // Get Checkbox Value
   const handleCheckbox = (e) => {
      e.persist();
      setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
   }

   // View Category/id
   useEffect(() => {
      axios.get(`/api/admin/edit-category/${category_id.id}`).then(res => {

         if (res.data.status === 200) {
            setCategory(res.data.category);
            setCheckbox(res.data.category);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/admin/view-categories');
         }

         setLoading(false);

      });
   }, [category_id.id]);


   // Update Category
   const updateCategory = (e) => {

      e.preventDefault();

      const formData = {
         slug: category.slug,
         name: category.name,
         description: category.description,
         status: checkbox.status ? '1' : '0',
         meta_title: category.meta_title,
         meta_keywords: category.meta_keywords,
         meta_description: category.meta_description
      }

      axios.post(`/api/admin/update-category/${category_id.id}`, formData).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/admin/view-categories');
            setErrors([]);
         } else if (res.data.status === 400) {
            swal('Fill in the mandatory fiealds.', '', 'error');
            setErrors(res.data.errors);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/admin/view-categories');
         }

      });

   }

   if (loading) {
      return <Loading />;
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4 className='text-white'>
                  Edit Category
                  <Link to='/admin/view-categories' className='float-end'>
                     <i className='bi bi-arrow-return-left nav-link text-white'></i>
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               <div className='container-fluid'>
                  <form onSubmit={updateCategory}>

                     <ul className='nav nav-tabs' id='myTab' role='tablist'>
                        <li className='nav-item' role='presentation'>
                           <button className='nav-link active' id='home-tab' data-bs-toggle='tab' data-bs-target='#home-tab-pane' type='button' role='tab' aria-controls='home-tab-pane' aria-selected='true'>Home</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                           <button className='nav-link' id='seo-tags-tab' data-bs-toggle='tab' data-bs-target='#seo-tags-tab-pane' type='button' role='tab' aria-controls='seo-tags-tab-pane' aria-selected='false'>SEO Tags</button>
                        </li>
                     </ul>

                     <div className='tab-content mt-4' id='myTabContent'>

                        {/* Home */}
                        <div className='tab-pane fade show active card-body' id='home-tab-pane' role='tabpanel' aria-labelledby='home-tab' tabindex='0'>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={category.slug} type='text' name='slug' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Slug</label>
                              <span className='text-danger'>{errors.slug}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={category.name} type='text' name='name' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Name</label>
                              <span className='text-danger'>{errors.name}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={category.description} type='text' name='description' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Description</label>
                              <span className='text-danger'>{errors.description}</span>
                           </div>

                           <div className='form-check mb-3'>
                              <input type='checkbox' name='status' onChange={handleCheckbox} defaultChecked={checkbox.status === 1 ? true : false} className='form-check-input' id='flexCheckChecked' />
                              <label className='form-check-label text-muted' for='flexCheckChecked'>
                                 Status (Checked = Hidden)
                              </label>
                           </div>

                        </div>

                        {/* SEO Tags */}
                        <div className='tab-pane fade card-body' id='seo-tags-tab-pane' role='tabpanel' aria-labelledby='seo-tags-tab' tabindex='0'>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={category.meta_title} type='text' name='meta_title' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Meta Title</label>
                              <span className='text-danger'>{errors.meta_title}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={category.meta_keywords} type='text' name='meta_keywords' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Meta Keywords</label>
                              <span className='text-danger'>{errors.meta_keywords}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={category.meta_description} type='text' name='meta_description' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Meta Description</label>
                              <span className='text-danger'>{errors.meta_description}</span>
                           </div>

                        </div>

                        <div className='ps-3'>
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
