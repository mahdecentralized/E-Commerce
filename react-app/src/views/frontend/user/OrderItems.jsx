import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Loading from '../../../components/assets/loading/Loading'


export default function OrderItems() {

   document.title = 'Order Items';
   var view_order_items = ''
   const redirect = useNavigate();
   const order_id = useParams();
   const [loading, setLoading] = useState(true);
   const [orderItems, setOrderItems] = useState();

   // View Order Items
   useEffect(() => {
      axios.get(`/api/view-order-items/${order_id.id}`).then(res => {

         if (res.data.status === 200) {
            setOrderItems(res.data.order_items);
         } else if (res.data.status === 404) {
            swal('Error', res.data.error, 'error');
            redirect('/view-orders');
         } else if (res.data.status === 401) {
            swal('Warning', res.data.warning, 'warning');
            redirect('/');
         }

         setLoading(false);

      });
   }, [order_id.id]);

   if (loading) {
      return <Loading />;
   }

   if (orderItems.length > 0) {
      view_order_items =
         <table className='table table-dark table-bordered text-center table-striped'>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
               </tr>
            </thead>
            <tbody>
               {
                  orderItems.map(item => {
                     return (
                        <tr key={item.id}>
                           <td>{item.product.name}</td>
                           <td>${item.price}</td>
                           <td>{item.quantity}</td>
                           <td>
                              <img src={`http://localhost:8000/${item.product.image}`} width='50px' height='40px' alt={item.name} />
                           </td>
                        </tr>
                     );
                  })
               }
            </tbody>
         </table>
   } else {
      view_order_items =
         <h4>You don't have an order.</h4 >
   }

   return (
      <div className='container w-50'>
         <div className='card text-bg-dark my-4 border-light rounded-1'>
            <div className='card-header py-3' style={{backgroundColor: '#363e47'}}>
               <h4>
                  Order Items
                  <Link to='/view-orders' className='float-end'>
                     <i className="bi bi-arrow-return-left nav-link text-white"></i>
                  </Link>
               </h4>
            </div>
            <div className='card-body py-5'>
               {view_order_items}
            </div>
         </div>
      </div>
   );
}
