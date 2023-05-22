import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'


export default function AddProduct() {

   document.title = 'Add Product';
   const redirect = useNavigate();
   const [categories, setCategories] = useState([]);
   const [errors, setErrors] = useState([]);
   const [picture, setPicture] = useState([]);
   const [checkboxes, setCheckboxes] = useState([]);
   const [product, setProduct] = useState({
      category_id: '',
      slug: '',
      name: '',
      description: '',
      meta_title: '',
      meta_keywords: '',
      meta_description: '',
      selling_price: '',
      orginal_price: '',
      quantity: '',
      brand: '',
      featured: '',
      popular: '',
      status: ''
   });

   // Get Inputs Value
   const handleInput = (e) => {
      e.persist();
      setProduct({ ...product, [e.target.name]: e.target.value });
   }

   // Get Image Value
   const handleImage = (e) => {
      setPicture({ image: e.target.files[0] });
   }

   // Get Checkboxes Value
   const handleCheckbox = (e) => {
      e.persist();
      setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
   }

   // View Category Name
   useEffect(() => {
      axios.get(`/api/admin/view-name-categories`).then(res => {

         if (res.data.status === 200) {
            setCategories(res.data.categories);
         }

      });
   }, []);

   // Add Product
   const submitProduct = (e) => {

      e.preventDefault();

      const data = new FormData();
      data.append('category_id', product.category_id);
      data.append('slug', product.slug);
      data.append('name', product.name);
      data.append('description', product.description);
      data.append('meta_title', product.meta_title);
      data.append('meta_keywords', product.meta_keywords);
      data.append('meta_description', product.meta_description);
      data.append('selling_price', product.selling_price);
      data.append('orginal_price', product.orginal_price);
      data.append('quantity', product.quantity);
      data.append('brand', product.brand);
      data.append('image', picture.image);
      data.append('featured', checkboxes.featured ? '1' : '0');
      data.append('popular', checkboxes.popular ? '1' : '0');
      data.append('status', checkboxes.status ? '1' : '0');

      axios.post(`/api/admin/add-product`, data).then(res => {

         if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            redirect('/admin/view-products');
            setErrors([]);
         } else if (res.data.status === 400) {
            swal('Fill in the mandatory fiealds.', '', 'error');
            setErrors(res.data.errors);
         }

      });
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>
                  Add Product
                  <Link to='/admin/view-products' className='btn btn-light btn-sm float-end'>
                     <i className='bi bi-view-list'></i> View Product
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               <div className='container-fluid'>
                  <form onSubmit={submitProduct} encType='multipart/form-data'>

                     <nav>
                        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                           <button className='nav-link active' id='nav-home-tab' data-bs-toggle='tab' data-bs-target='#nav-home' type='button' role='tab' aria-controls='nav-home' aria-selected='true'>Home</button>
                           <button className='nav-link' id='seo-tags-tab' data-bs-toggle='tab' data-bs-target='#seo-tags' type='button' role='tab' aria-controls='seo-tags' aria-selected='false'>SEO Tags</button>
                           <button className='nav-link' id='other-details-tab' data-bs-toggle='tab' data-bs-target='#other-details' type='button' role='tab' aria-controls='other-details' aria-selected='false'>Other Details</button>
                        </div>
                     </nav>

                     <div className='tab-content mt-4' id='nav-tabContent'>

                        {/* Home */}
                        <div className='tab-pane card-body fade show active' id='nav-home' role='tabpanel' aria-labelledby='nav-home-tab' tabindex='0'>

                           <div className='form-floating mb-3'>
                              <select onChange={handleInput} value={product.category_id} name='category_id' id='select' className='form-select text-light bg-dark'>
                                 <option></option>
                                 {
                                    categories.map(item => {
                                       return (
                                          <option selected value={item.id} key={item.id}>{item.name}</option>
                                       );
                                    })
                                 }
                              </select>
                              <label className='text-muted' for='select'>Select Category</label>
                              <span className='text-danger'>{errors.category_id}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={product.slug} type='text' name='slug' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Slug</label>
                              <span className='text-danger'>{errors.slug}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={product.name} type='text' name='name' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Name</label>
                              <span className='text-danger'>{errors.name}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={product.description} type='text' name='description' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Description</label>
                              <span className='text-danger'>{errors.description}</span>
                           </div>

                        </div>

                        {/* SEO Tags */}
                        <div className='tab-pane card-body fade' id='seo-tags' role='tabpanel' aria-labelledby='seo-tags-tab' tabindex='0'>

                           <div className='form-floating mb-3'>
                              <input onChange={handleInput} value={product.meta_title} type='text' name='meta_title' className='form-control bg-dark text-light' autoComplete='off' />
                              <label className='text-muted'>Meta Title</label>
                              <span className='text-danger'>{errors.meta_title}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={product.meta_keywords} type='text' name='meta_keywords' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Meta Keywords</label>
                              <span className='text-danger'>{errors.meta_keywords}</span>
                           </div>

                           <div className='form-floating mb-3'>
                              <textarea onChange={handleInput} value={product.meta_description} type='text' name='meta_description' className='form-control bg-dark text-light' autoComplete='off'></textarea>
                              <label className='text-muted'>Meta Description</label>
                              <span className='text-danger'>{errors.meta_description}</span>
                           </div>

                        </div>

                        {/* Other Details */}
                        <div className='tab-pane card-body fade' id='other-details' role='tabpanel' aria-labelledby='other-details-tab' tabindex='0'>
                           <div className='row'>

                              <div className='col-md-6'>
                                 <div className='form-floating mb-3'>
                                    <input onChange={handleInput} value={product.selling_price} type='number' name='selling_price' className='form-control bg-dark text-light' autoComplete='off' />
                                    <label className='text-muted'>Selling Price</label>
                                    <span className='text-danger'>{errors.selling_price}</span>
                                 </div>
                              </div>

                              <div className='col-md-6'>
                                 <div className='form-floating mb-3'>
                                    <input onChange={handleInput} value={product.orginal_price} type='number' name='orginal_price' className='form-control bg-dark text-light' autoComplete='off' />
                                    <label className='text-muted'>Orginal Price</label>
                                    <span className='text-danger'>{errors.orginal_price}</span>
                                 </div>
                              </div>

                              <div className='col-md-6'>
                                 <div className='form-floating mb-3'>
                                    <input onChange={handleInput} value={product.quantity} type='number' name='quantity' className='form-control bg-dark text-light' autoComplete='off' />
                                    <label className='text-muted'>Quantity</label>
                                    <span className='text-danger'>{errors.quantity}</span>
                                 </div>
                              </div>

                              <div className='col-md-6'>
                                 <div className='form-floating mb-3'>
                                    <input onChange={handleInput} value={product.brand} type='text' name='brand' className='form-control bg-dark text-light' autoComplete='off' />
                                    <label className='text-muted'>Brand</label>
                                    <span className='text-danger'>{errors.brand}</span>
                                 </div>
                              </div>

                              <div className='col-md-12 form-group mb-3'>
                                 <input type='file' name='image' onChange={handleImage} className='form-control bg-dark text-muted' />
                                 <span className='text-danger'>{errors.image}</span>
                              </div>

                              <div className='col-md-4 form-group mb-3'>
                                 <input type='checkbox' name='featured' onChange={handleCheckbox} defaultChecked={checkboxes.featured === 1 ? true : false} className='form-check-input' id='featured' />
                                 <label className='form-check-label text-muted ps-2' for='featured'>
                                    Featured (Checked = Shown)
                                 </label>
                              </div>

                              <div className='col-md-4 form-group mb-3'>
                                 <input type='checkbox' name='popular' onChange={handleCheckbox} defaultChecked={checkboxes.popular === 1 ? true : false} className='form-check-input' id='popular' />
                                 <label className='form-check-label text-muted ps-2' for='popular'>
                                    Popular (Checked = Shown)
                                 </label>
                              </div>

                              <div className='col-md-4 form-group mb-3'>
                                 <input type='checkbox' name='status' onChange={handleCheckbox} defaultChecked={checkboxes.status === 1 ? true : false} className='form-check-input' id='status' />
                                 <label className='form-check-label text-muted ps-2' for='status'>
                                    Status (Checked = Hidden)
                                 </label>
                              </div>

                           </div>
                        </div>

                     </div>

                     <div className='ps-3'>
                        <button type='submit' className='btn btn-primary px-5'>Add</button>
                     </div>

                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
