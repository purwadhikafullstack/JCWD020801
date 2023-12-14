import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import LoginAdmin from './pages/loginAdmin';
import AdminDashboard from './pages/adminDashboard';
import AdminManagement from './pages/adminDashboard/components/adminManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-admin" element={<LoginAdmin/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-management" element={<AdminManagement/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
