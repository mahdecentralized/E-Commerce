import '../../assets/assets/css/styles.css'
import '../../assets/assets/js/scripts'

import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


export default function FrontendRoute() {
   
   return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
         <Navbar />
         <main className='w-100 mt-5 pt-5'>
            <Outlet />
         </main>
      </div>
   );

}
