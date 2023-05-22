import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../../components/assets/loading/Loading';
import '../../../../style.css'


export default function ViewAddresses() {

   document.title = 'View Addresses'
   var view_addresses = '';
   const redirect = useNavigate();
   const [loading, setLoading] = useState(true);
   const [addresses, setAddresses] = useState([]);


   if (!localStorage.getItem('auth_token')) {
      swal('Warning', 'Unauthorized!', 'warning');
      redirect('/');
   }

   // View Addresses
   useEffect(() => {
      axios.get(`/api/view-addresses`).then(res => {

         if (res.data.status === 200) {
            setAddresses(res.data.addresses);
         }

         setLoading(false);

      });
   }, []);

   if (loading) {
      return <Loading />;
   }

   // Addresses Data
   if (addresses.length > 0) {
      view_addresses =
         <table className='table table-dark table-bordered text-center table-striped'>
            <thead>
               <tr>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Edit</th>
               </tr>
            </thead>
            <tbody>
               {
                  addresses.map(item => {
                     return (
                        <tr key={item.id}>
                           <td>{item.first_name} {item.last_name}</td>
                           <td>{item.phone}</td>
                           <td>{item.email}</td>
                           <td>{item.address}</td>
                           <td>{item.city}</td>
                           <td>{item.state}</td>
                           <td>{item.zip_code}</td>
                           <td>
                              <Link to={`/edit-address/${item.id}`} className='btn btn-warning btn-sm'>
                                 <i className="bi bi-pencil-square"></i> Edit
                              </Link>
                           </td>
                        </tr>
                     );
                  })
               }
            </tbody>
         </table>
   } else {
      view_addresses =
         <div>
            <h4 className='pb-3'>You have no address.</h4>
            <h6>Please add an address to place order.</h6>
         </div>
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>
                  Addresses
                  <Link to='/add-address' className='btn btn-light btn-sm float-end'>
                     <i className="bi bi-plus-circle"></i> Add Address
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               {view_addresses}
            </div>
         </div>
      </div>
   );
   
}
