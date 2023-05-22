import { Navigate, createBrowserRouter } from 'react-router-dom'

// Admin
import AdminRoute from './components/admin/AdminRoute'
import AddCategory from './views/admin/category/AddCategory'
import EditCategory from './views/admin/category/EditCategory'
import ViewCategories from './views/admin/category/ViewCategories'
import AddProduct from './views/admin/product/AddProduct'
import ViewProduct from './views/admin/product/ViewProduct'
import EditProduct from './views/admin/product/EditProduct'
import ViewOrders from './views/admin/order/ViewOrders'
import ViewOrderItems from './views/admin/order/ViewOrderItems'

// Frontend
import FrontendRoute from './components/frontend/FrontendRoute'
import Register from './views/frontend/auth/Register'
import Login from './views/frontend/auth/Login'
import Home from './views/frontend/Home'
import CategoriesCollection from './views/frontend/collection/CategoriesCollection'
import ProductsCollection from './views/frontend/collection/ProductsCollection'
import ProductDetails from './views/frontend/collection/ProductDetails'
import Cart from './views/frontend/order/Cart'
import Checkout from './views/frontend/order/Checkout'
import AddAddress from './views/frontend/address/AddAddress'
import ViewAddresses from './views/frontend/address/ViewAddresses'
import EditAddress from './views/frontend/address/EditAddress'
import Orders from './views/frontend/user/Orders'
import OrderItems from './views/frontend/user/OrderItems'
import Profile from './views/frontend/user/Profile'

const router = createBrowserRouter([
   {

      // ** Frontend Routes
      path: '/',
      element: <FrontendRoute />,
      children: [

         // ** Home 
         { path: '/', element: <Navigate to='/home' /> },
         { path: 'home', element: <Home /> },


         // ** Auth 
         //Register
         { path: 'register', element: localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Register /> },

         //Login
         { path: 'login', element: localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Login /> },


         // ** Collection
         //Categories Collection
         { path: 'collections', element: <CategoriesCollection /> },

         //Products Collection
         { path: 'collections/:slug', element: <ProductsCollection /> },

         //Product Details
         { path: 'collections/:category/:product', element: <ProductDetails /> },


         // ** Order
         // Cart
         { path: 'cart', element: <Cart /> },

         // Checkout
         { path: 'checkout', element: <Checkout /> },


         // ** Address
         // Add Address
         { path: 'add-address', element: <AddAddress /> },

         // View Addresses
         { path: 'view-addresses', element: <ViewAddresses /> },

         // Edit Address
         { path: 'edit-address/:id', element: <EditAddress /> },


         // ** User
         // View Orders
         { path: 'view-orders', element: <Orders /> },

         // View Order Items
         { path: 'view-order-items/:id', element: <OrderItems /> },

         // Edit Profile
         { path: 'profile', element: <Profile /> },

      ]
   },


   // ** Admin Routes
   {
      path: '/admin',
      element: <AdminRoute />,
      children: [

         // ** Dashboard
         { path: '/admin', element: <Navigate to='/admin/view-orders' /> },


         // ** Category 
         //Add Category
         { path: 'add-category', element: <AddCategory /> },

         //View Categories
         { path: 'view-categories', element: <ViewCategories /> },

         //Edit Category
         { path: 'edit-category/:id', element: <EditCategory /> },


         // ** Product
         // Add Product
         { path: 'add-product', element: <AddProduct /> },

         // View Product
         { path: 'view-products', element: <ViewProduct /> },

         // Edit Product
         { path: 'edit-product/:id', element: <EditProduct /> },


         // ** Order
         // View Orders
         { path: 'view-orders', element: <ViewOrders /> },

         // View Order Items
         { path: 'view-order-items/:id', element: <ViewOrderItems /> }

      ]
   },
]);

export default router;