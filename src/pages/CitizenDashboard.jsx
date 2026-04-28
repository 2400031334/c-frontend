import { useState, useEffect } from 'react';
import { fileComplaint, getMyComplaints } from '../api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import FloatingActionButton from '../components/FloatingActionButton';

const CATEGORIES = ['ROADS', 'WATER', 'ELECTRICITY', 'SANITATION', 'PUBLIC_SAFETY', 'EDUCATION', 'HEALTHCARE', 'OTHER'];

export default function CitizenDashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'ROADS' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try { const { data } = await getMyComplaints(); setComplaints(data); } catch { toast.error('Failed to load complaints'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try { await fileComplaint(form); toast.success('Complaint filed successfully!'); setShowModal(false); setForm({ title: '', description: '', category: 'ROADS' }); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed to file complaint'); }
    finally { setSubmitting(false); }
  };

  const stats = { total: complaints.length, pending: complaints.filter(c => c.status === 'PENDING').length, resolved: complaints.filter(c => c.status === 'RESOLVED').length };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Manage your complaints and track their resolution status.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">{stats.total}</div><div className="stat-label">Total Complaints</div></div>
          <div className="stat-card"><div className="stat-icon">⏳</div><div className="stat-value">{stats.pending}</div><div className="stat-label">Pending</div></div>
          <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{stats.resolved}</div><div className="stat-label">Resolved</div></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem' }}>My Complaints</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ File New Complaint</button>
        </div>
        {loading ? <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div> :
          complaints.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📭</div><h3>No complaints yet</h3><p>File your first complaint to get started.</p><button className="btn btn-primary" onClick={() => setShowModal(true)}>File Complaint</button></div>
          ) : (
            <div className="complaint-list">
              {complaints.map(c => (
                <div key={c.id} className="complaint-card">
                  <div className="complaint-card-header"><h3>{c.title}</h3><StatusBadge status={c.status} /></div>
                  <p>{c.description}</p>
                  <div className="complaint-meta">
                    <span>📂 {c.category}</span>
                    <span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                    {c.assignedPoliticianName && <span>👤 Assigned to: {c.assignedPoliticianName}</span>}
                  </div>
                  {c.resolutionNotes && <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--success-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}><strong>Resolution:</strong> {c.resolutionNotes}</div>}
                </div>
              ))}
            </div>
          )}
        {showModal && (
          <Modal title="File New Complaint" onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Brief summary of your issue" /></div>
              <div className="form-group"><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>{CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}</select></div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Describe your issue in detail..." /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Complaint'}</button>
            </form>
          </Modal>
        )}
        <FloatingActionButton showFile onFileComplaint={() => setShowModal(true)} />
      </div>
    </div>
  );
}
