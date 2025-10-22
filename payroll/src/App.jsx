import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import ForgotPassword from './pages/forgotpassword'
import AdminDashboard from './pages/Admindashboard'
import Employeedashboard from './pages/Employeedashboard'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import PrivateRoutes from './utils/privateRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* backward-compatible redirect for mistyped path */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiresRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        />

        <Route path="/employee/dashboard" element={<Employeedashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;