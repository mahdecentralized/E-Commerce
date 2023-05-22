import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../components/assets/loading/Loading'


export default function ViewOrders() {

   document.title = 'View Orders';
   var view_orders = '';
   const [loading, setLoading] = useState(true);
   const [orders, setOrders] = useState([]);

   // View Orders
   useEffect(() => {
      axios.get(`/api/admin/view-orders`).then(res => {

         if (res.data.status === 200) {
            setOrders(res.data.orders);
         }

         setLoading(false);

      });
   }, []);

   if (loading) {
      return <Loading />;
   }
   // Orders Data
   if (orders.length > 0) {
      view_orders =
         <table className='table table-dark table-bordered text-center table-striped'>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Tracking Number</th>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th>Full Address</th>
                  <th>Order Time</th>
               </tr>
            </thead>
            <tbody>
               {
                  orders.map(item => {
                     return (
                        <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.tracking_no}</td>
                           <td>{item.address.first_name} {item.address.last_name}</td>
                           <td>
                              <div className='text-truncate d-inline-block' style={{ maxWidth: '100px' }}>
                                 {item.address.phone}
                              </div>
                           </td>
                           <td>
                              <div className='text-truncate d-inline-block' style={{ maxWidth: '150px' }}>
                                 {item.address.email}
                              </div>
                           </td>
                           <td>
                              <div className='text-truncate d-inline-block' style={{ maxWidth: '100px' }}>
                                 {item.address.state}, {item.address.city}, {item.address.address}
                              </div>
                           </td>
                           <td>
                              <div className='text-truncate d-inline-block' style={{ maxWidth: '150px' }}>
                                 <Link to={`/admin/view-order-items/${item.id}`} className='btn btn-warning btn-sm'>
                                    <i className='bi bi-view-list'></i> Order Items
                                 </Link>
                              </div>

                           </td>
                        </tr>
                     )
                  })
               }
            </tbody>
         </table>
   } else {
      view_orders =
         <h4>No order has been placed.</h4>
   }

   return (
      <div className='container'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{ backgroundColor: '#363e47' }}>
               <h4>Orders</h4>
            </div>
            <div className='card-body py-5'>
               {view_orders}
            </div>
         </div>
      </div>
   );
   
}
