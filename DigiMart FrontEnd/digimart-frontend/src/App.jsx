import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import UserHome from './pages/UserHome';
import Register from './components/register';
import UploadPage from './pages/UploadPage';
import MockPayment from './pages/MockPayment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment/:fileId" element={<PrivateRoute><MockPayment /></PrivateRoute>} />
      
      {/* Protect home and admin */}
      <Route
        path="/home"
        element={
          <PrivateRoute requiredRole="USER">
            <UserHome />
          </PrivateRoute>
        }
      />
      
      <Route path="/admin" element={
        <PrivateRoute requiredRole="ADMIN">
          <AdminPage />
        </PrivateRoute>
      } />
      <Route
        path="/upload"
        element={
          <PrivateRoute requiredRole="USER">
            <UploadPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;