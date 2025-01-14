import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import VacationList from './Pages/Vacations/VacationsList';
import VacationManager from './Pages/Vacations/VacationManager';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import styles from './App.module.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Navbar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vacations" element={<VacationList />} />
              
              {/* Rutas protegidas de admin */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="vacations" element={<VacationManager />} />
                    </Routes>
                  </ProtectedRoute>
                } 
                
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;