// Routing.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Login, Register } from './Pages/Auth';
import Vacations from './Pages/Vacations';
import AdminDashboard from './Pages/Admin/AdminDashboard';

// Protected Route Component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const Routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default Routing;