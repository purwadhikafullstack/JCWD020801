import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import LoginAdmin from './pages/loginAdmin';
import AdminDashboard from './pages/adminDashboard';
import AdminManagement from './pages/adminDashboard/components/adminManagement';
import { HomePage } from './pages/home';
import { UserDashboard } from './pages/userDashboard';
import { UserVerification } from './pages/userVerification';
import { UserSignIn } from './pages/userSignIn';
import { UserRegister } from './pages/userRegister';
import { AccountVerification } from './pages/accountVerification';
import Required from './components/required';
import { useDispatch } from 'react-redux'
import { setData } from '../redux/customerSlice';
import { useEffect } from 'react';
import axios from 'axios';
import { UserResetPassword } from './pages/userResetPassword';
import { UserUpdateEmail } from './pages/userUpdateEmail';


const router = createBrowserRouter([
  // Untuk yang tidak butuh token
  { path: "/", element: <Home /> },
  { path: "/home", element: <HomePage /> },
  { path: "/login-admin", element: <LoginAdmin /> },
  { path: "/signin", element: <UserSignIn /> },
  { path: "/register", element: <UserRegister /> },
  { path: "/verify/:token", element: <AccountVerification /> },
  { path: "/user-reset-password/:token", element: <UserResetPassword /> },
  { path: "/user-update-email/:token", element: <UserUpdateEmail /> },

  {
    element: <Required />,
    children: [
      // untuk yang butuh token
      { path: "/admin-dashboard", element: <AdminDashboard /> },
      { path: "/admin-management", element: <AdminManagement /> },
      { path: "/user-dashboard", element: <UserDashboard /> },
      { path: "/user-verification", element: <UserVerification /> },
    ],
  },
]);


function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const keepLoginCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/customer/keep-login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ini dari keepLoginCustomer", response.data.result);
      dispatch(setData(response.data.result));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (token) {
      keepLoginCustomer();
    }
  }, []);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;




