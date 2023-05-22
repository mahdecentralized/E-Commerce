import { Link } from 'react-router-dom'


export default function Sidebar() {

   return (
      <nav className='sb-sidenav sb-sidenav-dark bg-dark border-end border-secondary py-4'>
         <div className='sb-sidenav-menu'>
            <div className='nav py-3'>

               <Link className='nav-link' to='/'>
                  <i className='bi bi-house pe-2'></i>Home
               </Link>

               <hr />
               <h6 className='ps-3 text-light'>Category</h6>
               <Link className='nav-link' to='/admin/add-category'>
                  <i className='bi bi-plus-circle pe-2'></i> Add Category
               </Link>

               <Link className='nav-link' to='/admin/view-categories'>
                  <i className='bi bi-view-list pe-2'></i> View Categories
               </Link>

               <hr />
               <h6 className='ps-3 text-light'>Product</h6>
               <Link className='nav-link' to='/admin/add-product'>
                  <i className='bi bi-plus-circle pe-2'></i> Add Product
               </Link>

               <Link className='nav-link' to='/admin/view-products'>
                  <i className='bi bi-view-list pe-2'></i>View Products
               </Link>

               <hr />
               <h6 className='ps-3 text-light'>Order</h6>
               <Link className='nav-link' to='/admin/view-orders'>
                  <i className='bi bi-bag pe-2'></i> View Orders
               </Link>

            </div>
         </div>
      </nav>
   );
   
}