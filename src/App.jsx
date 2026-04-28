import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import RoleSelectPage from './pages/RoleSelectPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import CitizenDashboard from './pages/CitizenDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import PoliticianDashboard from './pages/PoliticianDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><HomePage /><Footer /></>} />
        <Route path="/contact" element={<><ContactPage /><Footer /></>} />
        <Route path="/select-role" element={<RoleSelectPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard/citizen" element={<ProtectedRoute roles={['CITIZEN']}><CitizenDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/moderator" element={<ProtectedRoute roles={['MODERATOR']}><ModeratorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/politician" element={<ProtectedRoute roles={['POLITICIAN']}><PoliticianDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </>
  );
}
