import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { Vacations, VacationDetails } from './Pages/Vacations';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import { Box } from '@mui/material';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacations/:id" element={<VacationDetails />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;



// import { Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Home from './Pages/Home/Home';
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';
// import Vacations from './Pages/Vacations/Vacations';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import { Box } from '@mui/material';
// import { AuthProvider } from './Context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//         <Navbar />
//         <Box component="main" sx={{ flexGrow: 1 }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/vacations" element={<Vacations />} />
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           </Routes>
//         </Box>
//       </Box>
//     </AuthProvider>
//   );
// }

// export default App;