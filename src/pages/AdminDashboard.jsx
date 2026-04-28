import { useState, useEffect } from 'react';
import { getStats, getUsers, updateUserRole } from '../api';
import { useToast } from '../context/ToastContext';

const ROLES = ['CITIZEN', 'MODERATOR', 'POLITICIAN', 'ADMIN'];

export default function AdminDashboard() {
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [sRes, uRes] = await Promise.all([getStats(), getUsers()]);
      setStats(sRes.data); setUsers(uRes.data);
    } catch { toast.error('Failed to load data'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleRoleChange = async (userId, newRole) => {
    try { await updateUserRole(userId, newRole); toast.success('Role updated'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
  };

  if (loading) return <div className="dashboard"><div className="container" style={{ textAlign: 'center', paddingTop: 80 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div></div>;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header"><h1>Admin Dashboard ⚙</h1><p>Platform overview and user management.</p></div>
        {stats && (
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-value">{stats.totalUsers}</div><div className="stat-label">Total Users</div></div>
            <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">{stats.totalComplaints}</div><div className="stat-label">Total Complaints</div></div>
            <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{stats.resolvedComplaints}</div><div className="stat-label">Resolved</div></div>
            <div className="stat-card"><div className="stat-icon">📊</div><div className="stat-value">{stats.resolutionRate}%</div><div className="stat-label">Resolution Rate</div></div>
          </div>
        )}
        {stats && (
          <div className="stats-grid" style={{ marginBottom: 40 }}>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: '1.5rem' }}>{stats.pendingComplaints}</div><div className="stat-label">Pending</div></div>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: '1.5rem' }}>{stats.verifiedComplaints}</div><div className="stat-label">Verified</div></div>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: '1.5rem' }}>{stats.inProgressComplaints}</div><div className="stat-label">In Progress</div></div>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: '1.5rem' }}>{stats.rejectedComplaints}</div><div className="stat-label">Rejected</div></div>
          </div>
        )}
        <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 20 }}>User Management</h2>
        <div className="table-container card">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge badge-${u.role === 'ADMIN' ? 'verified' : u.role === 'MODERATOR' ? 'in_progress' : u.role === 'POLITICIAN' ? 'pending' : 'resolved'}`}>{u.role}</span></td>
                  <td>{u.verified ? '✅' : '❌'}</td>
                  <td>
                    <select className="form-select" style={{ padding: '6px 10px', fontSize: '0.82rem', maxWidth: 150 }} value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
