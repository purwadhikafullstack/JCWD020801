import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginAdmin from './pages/admin/loginAdmin';
import AdminManagement from './pages/admin/adminManagement';
import CustomerManagement from './pages/admin/customerManagement';
import Overview from './pages/admin/overview';
import Home from './pages/home/Home';
import Required from './components/required';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setDataAdmin } from './redux/adminSlice';
import axios from './api/axios';
import AdminVerification from './pages/admin/components/adminVerification';
import ProductManagement from './pages/admin/productManagement';
import AdminProfile from './pages/admin/adminProfile';
import AdminResetPassword from './pages/admin/components/adminResetPassword';
import { ExpiredToken } from './pages/admin/components/dialogs';
import CategoryManagement from './pages/admin/categoryManagement';
import { HomePage } from './pages/home';
import { UserDashboard } from './pages/userDashboard';
import { UserVerification } from './pages/userVerification';
import { UserSignIn } from './pages/userSignIn';
import { UserRegister } from './pages/userRegister';
import { AccountVerification } from './pages/accountVerification';
import { setData } from './redux/customerSlice';
import AdminRequired from './components/adminRequired';

const router = createBrowserRouter([
  //Untuk yang tidak butuh token
  { path: "/", element: <Home /> },
  { path: "/login-admin", element: <LoginAdmin></LoginAdmin> },
  { path: "/admin-verification/:token", element: <AdminVerification/> },
  { path: "/admin-reset-password/:token", element: <AdminResetPassword/> },
  { path: "/home", element: <HomePage /> },
  { path: "/signin", element: <UserSignIn /> },
  { path: "/register", element: <UserRegister /> },
  { path: "/verify/:token", element: <AccountVerification /> },
  {
    element: <Required />,
    children: [
      //untuk yang butuh customer
      { path: "/user-dashboard", element: <UserDashboard /> },
      { path: "/user-verification", element: <UserVerification /> },
    ],
  },
  {
    element: <AdminRequired/>,
    children: [
      { path: "/admin-management", element: <AdminManagement /> },
      { path: "/admin-overview", element: <Overview/> },
      { path: "/customer-management", element: <CustomerManagement/> },
      { path: "/product-management", element: <ProductManagement/> },
      { path: "/admin-profile", element: <AdminProfile/> },
      { path: "/category-management", element: <CategoryManagement/> }
    ]
  }
]);

function App() {
  const token = localStorage.getItem("token");
  const admtoken = localStorage.getItem('admtoken')
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open);

  const keepLoginAdmin = async () => {
    try {
        const response = await axios.get("admins/keep-login", {
          headers: {
            Authorization: `Bearer ${admtoken}`,
          },
        });
        dispatch(setDataAdmin(response.data.result));
    } catch (err) {
      if(err.response.status === 401){
        localStorage.removeItem('admtoken')
        handleOpen();
      }
    }
  };

  const keepLoginCustomer = async () => {
    try {
      const response = await axios.get('customer/keep-login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setData(response.data.result));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      keepLoginCustomer();
    }
    if(admtoken){
      keepLoginAdmin();
    }
  }, []);

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    <ExpiredToken
    content={'Please login again'}
    openDialog={open}
    handleOpen={handleOpen}/>
    </>
  );
}

export default App;




