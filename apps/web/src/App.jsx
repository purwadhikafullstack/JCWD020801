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
import { UserResetPassword } from './pages/userResetPassword';
import { UserUpdateEmail } from './pages/userUpdateEmail';
import { setData } from './redux/customerSlice';
import AdminRequired from './components/adminRequired';
import { StoreManagement } from './pages/admin/storeManagement';
import { StoreBranchDetail } from './pages/admin/storeManagement/storeBranchDetail';
import { StoreLocator } from './pages/storeLocator';
import { CheckoutPage } from './pages/checkout';
import { ProductCatalogue } from './pages/productCatalogue';
import AdminErrorPage from './pages/admin/components/adminErrorPage';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login-admin", element: <LoginAdmin></LoginAdmin> },
  { path: "/admin-verification/:token", element: <AdminVerification /> },
  { path: "/admin-reset-password/:token", element: <AdminResetPassword /> },
  { path: "/login-admin", element: <LoginAdmin></LoginAdmin> },
  { path: "/admin-verification/:token", element: <AdminVerification /> },
  { path: "/admin-reset-password/:token", element: <AdminResetPassword /> },
  { path: "/home", element: <HomePage /> },
  { path: "/signin", element: <UserSignIn /> },
  { path: "/register", element: <UserRegister /> },
  { path: "/verify/:token", element: <AccountVerification /> },
  { path: "/user-reset-password/:token", element: <UserResetPassword /> },
  { path: "/user-update-email/:token", element: <UserUpdateEmail /> },
  { path: "/store-locator", element: <StoreLocator /> },
  { path: "/catalogue", element: <ProductCatalogue /> },
  {
    element: <Required />,
    children: [
      //untuk yang butuh customer
      { path: "/user-dashboard", element: <UserDashboard /> },
      { path: "/user-verification", element: <UserVerification /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
  },
  {
    element: <AdminRequired />,
    children: [
      { path: "/admin-management", element: <AdminManagement /> },
      { path: "/admin-overview", element: <Overview /> },
      { path: "/customer-management", element: <CustomerManagement /> },
      { path: "/product-management", element: <ProductManagement /> },
      { path: "/admin-profile", element: <AdminProfile /> },
      { path: "/category-management", element: <CategoryManagement />},
      { path: "/error", element: <AdminErrorPage/> },
      { path: "/store-management", element: <StoreManagement /> },
      { path: "/store-management/:id", element: <StoreBranchDetail /> }
    ]
  }
]);

function App() {
  const token = localStorage.getItem("token");
  const admtoken = localStorage.getItem('admtoken')
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);

  const keepLoginAdmin = async () => {
    try {
      const response = await axios.get("admins/keep-login", {
        headers: {
          Authorization: `Bearer ${admtoken}`,
        },
      });
      dispatch(setDataAdmin(response.data.result));
    } catch (err) {
      if (err.response.status === 401) {
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

      localStorage.removeItem('token');
      history.push('/signin');
    }
  }

  useEffect(() => {
    if (token) {
      keepLoginCustomer();
    }
    if (admtoken) {
      keepLoginAdmin();
    }
  }, []);

  return (
    <>
      <RouterProvider router={router}>
        <ExpiredToken
          content={'Please login again'}
          open={open}
          handleOpen={handleOpen} />
      </RouterProvider>
    </>
  );
}

export default App;
