import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';
  const dashMap = { CITIZEN: '/dashboard/citizen', MODERATOR: '/dashboard/moderator', POLITICIAN: '/dashboard/politician', ADMIN: '/dashboard/admin' };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">CC</div>
          <span>Citizen Connect</span>
        </Link>
        <button className="mobile-toggle" onClick={() => setOpen(!open)}>☰</button>
        <div className={`navbar-links ${open ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setOpen(false)}>Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to={dashMap[user?.role] || '/'} className={isActive(dashMap[user?.role])} onClick={() => setOpen(false)}>Dashboard</Link>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', padding: '8px 12px' }}>
                {user?.name} ({user?.role})
              </span>
              <button className="btn-logout" onClick={() => { logout(); setOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')} onClick={() => setOpen(false)}>Login</Link>
              <Link to="/select-role" className={`btn btn-primary btn-sm`} onClick={() => setOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
