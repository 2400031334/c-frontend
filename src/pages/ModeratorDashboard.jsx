import { useState, useEffect } from 'react';
import { getPendingComplaints, updateComplaintStatus, getPoliticians } from '../api';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/StatusBadge';

export default function ModeratorDashboard() {
  const toast = useToast();
  const [complaints, setComplaints] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPol, setSelectedPol] = useState({});

  const load = async () => {
    try {
      const [cRes, pRes] = await Promise.all([getPendingComplaints(), getPoliticians()]);
      setComplaints(cRes.data);
      setPoliticians(pRes.data);
    } catch { toast.error('Failed to load data'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleAction = async (id, status) => {
    try {
      const body = { status };
      if (status === 'VERIFIED') {
        if (!selectedPol[id]) { toast.error('Please select a politician to assign'); return; }
        body.assignedPoliticianId = selectedPol[id];
      }
      await updateComplaintStatus(id, body);
      toast.success(`Complaint ${status.toLowerCase()} successfully`);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Action failed'); }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Moderator Dashboard 🛡</h1>
          <p>Review and validate pending citizen complaints.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">{complaints.length}</div><div className="stat-label">Pending Review</div></div>
          <div className="stat-card"><div className="stat-icon">👤</div><div className="stat-value">{politicians.length}</div><div className="stat-label">Available Politicians</div></div>
        </div>
        <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem', marginBottom: 20 }}>Pending Complaints Queue</h2>
        {loading ? <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div> :
          complaints.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">✨</div><h3>All clear!</h3><p>No pending complaints to review.</p></div>
          ) : (
            <div className="complaint-list">
              {complaints.map(c => (
                <div key={c.id} className="complaint-card">
                  <div className="complaint-card-header"><h3>{c.title}</h3><StatusBadge status={c.status} /></div>
                  <p>{c.description}</p>
                  <div className="complaint-meta">
                    <span>👤 {c.citizenName}</span><span>📂 {c.category}</span><span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="complaint-actions">
                    <select className="form-select" style={{ maxWidth: 220, padding: '8px 12px' }} value={selectedPol[c.id] || ''} onChange={e => setSelectedPol({ ...selectedPol, [c.id]: Number(e.target.value) })}>
                      <option value="">Assign Politician...</option>
                      {politicians.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <button className="btn btn-success btn-sm" onClick={() => handleAction(c.id, 'VERIFIED')}>✓ Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAction(c.id, 'REJECTED')}>✕ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
