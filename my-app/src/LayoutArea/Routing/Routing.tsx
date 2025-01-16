import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import VacationsList from "../../Pages/Vacations/VacationsList";
import AdminDashboard from "../../Pages/Admin/AdminDashboard";
import AdminRegister from "../../Pages/Admin/AdminRegister";
import ProtectedRoute from "../../Components/ProtectedRoute";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vacations" element={<VacationsList />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route 
                path="/admin/*" 
                element={
                    <ProtectedRoute requireAdmin>
                        <Routes>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="edit/:id" element={<AdminDashboard />} />
                        </Routes>
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
}

export default Routing; 