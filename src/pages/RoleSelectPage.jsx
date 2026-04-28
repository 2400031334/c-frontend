import { useNavigate } from 'react-router-dom';

const roles = [
  { key: 'CITIZEN', icon: '👤', title: 'Citizen', desc: 'Report public issues in your community and track their resolution progress in real-time.' },
  { key: 'MODERATOR', icon: '🛡', title: 'Moderator', desc: 'Review and validate citizen complaints. Filter spam and assign verified issues to officials.' },
  { key: 'POLITICIAN', icon: '🏛', title: 'Politician', desc: 'Receive verified complaints assigned to you. Update resolution status and communicate progress.' },
  { key: 'ADMIN', icon: '⚙', title: 'Admin', desc: 'Oversee the entire platform. Manage users, view analytics, and maintain system integrity.' },
];

export default function RoleSelectPage() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 className="section-title">Choose Your Role</h1>
          <p className="section-subtitle">Select how you'd like to participate in the Citizen Connect platform.</p>
        </div>
        <div className="roles-grid">
          {roles.map((r) => (
            <div key={r.key} className="role-card" onClick={() => navigate(`/signup?role=${r.key}`)}>
              <div className="role-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
