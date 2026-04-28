import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('cc_token');
    const savedUser = localStorage.getItem('cc_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = (tokenValue, userData) => {
    localStorage.setItem('cc_token', tokenValue);
    localStorage.setItem('cc_user', JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
    const dashMap = { CITIZEN: '/dashboard/citizen', MODERATOR: '/dashboard/moderator', POLITICIAN: '/dashboard/politician', ADMIN: '/dashboard/admin' };
    navigate(dashMap[userData.role] || '/');
  };

  const logout = () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!token;
  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, hasRole, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
