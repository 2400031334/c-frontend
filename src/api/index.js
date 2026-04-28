import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const verifyOtp = (data) => api.post('/auth/verify-otp', data);
export const resendOtp = (email) => api.post('/auth/resend-otp', { email });

// Complaints
export const fileComplaint = (data) => api.post('/complaints', data);
export const getMyComplaints = () => api.get('/complaints/my');
export const getPendingComplaints = () => api.get('/complaints/pending');
export const getAssignedComplaints = () => api.get('/complaints/verified');
export const updateComplaintStatus = (id, data) => api.patch(`/complaints/${id}/status`, data);
export const getPoliticians = () => api.get('/complaints/politicians');

// Admin
export const getStats = () => api.get('/admin/stats');
export const getUsers = () => api.get('/admin/users');
export const updateUserRole = (id, role) => api.patch(`/admin/users/${id}/role`, { role });

export default api;
