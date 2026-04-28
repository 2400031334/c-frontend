import { useState, useEffect } from 'react';
import { getAssignedComplaints, updateComplaintStatus } from '../api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';

export default function PoliticianDashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});

  const load = async () => {
    try { const { data } = await getAssignedComplaints(); setComplaints(data); } catch { toast.error('Failed to load complaints'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateComplaintStatus(id, { status, resolutionNotes: notes[id] || '' });
      toast.success(`Complaint marked as ${status.toLowerCase().replace('_', ' ')}`);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name} 🏛</h1>
          <p>Manage complaints assigned to you and update resolution status.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">{complaints.length}</div><div className="stat-label">Assigned Complaints</div></div>
          <div className="stat-card"><div className="stat-icon">🔄</div><div className="stat-value">{complaints.filter(c => c.status === 'IN_PROGRESS').length}</div><div className="stat-label">In Progress</div></div>
          <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{complaints.filter(c => c.status === 'VERIFIED').length}</div><div className="stat-label">New Assignments</div></div>
        </div>
        <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 20 }}>Assigned Complaints</h2>
        {loading ? <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div> :
          complaints.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📭</div><h3>No complaints assigned</h3><p>You'll see complaints here once a moderator assigns them to you.</p></div>
          ) : (
            <div className="complaint-list">
              {complaints.map(c => (
                <div key={c.id} className="complaint-card">
                  <div className="complaint-card-header"><h3>{c.title}</h3><StatusBadge status={c.status} /></div>
                  <p>{c.description}</p>
                  <div className="complaint-meta">
                    <span>👤 Filed by: {c.citizenName}</span><span>📂 {c.category}</span><span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="complaint-actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <textarea className="form-textarea" style={{ minHeight: 80 }} placeholder="Add resolution notes..." value={notes[c.id] || ''} onChange={e => setNotes({ ...notes, [c.id]: e.target.value })} />
                    <div style={{ display: 'flex', gap: 10 }}>
                      {c.status === 'VERIFIED' && <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(c.id, 'IN_PROGRESS')}>🔄 Mark In Progress</button>}
                      <button className="btn btn-success btn-sm" onClick={() => handleUpdate(c.id, 'RESOLVED')}>✅ Mark Resolved</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
