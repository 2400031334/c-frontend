import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Voice Matters. <span className="highlight">We Listen.</span></h1>
            <p>Citizen Connect bridges the gap between citizens and government. Report issues, track resolutions, and hold officials accountable — all in one transparent platform.</p>
            <div className="hero-actions">
              <Link to="/select-role" className="btn btn-primary btn-lg">File a Complaint →</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">A simple, transparent three-step process to get your issues heard and resolved by the right officials.</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>File Your Complaint</h3>
              <p>Register as a citizen and submit your grievance with relevant details. Choose the category that best fits your issue.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Verified by Moderators</h3>
              <p>Our moderators review and validate your complaint to ensure it meets quality standards before forwarding to officials.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Resolved by Officials</h3>
              <p>Verified complaints are assigned to relevant politicians who work on resolving your issues with transparent updates.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Trusted by Citizens Nationwide</h2>
          <p className="section-subtitle">Join thousands of citizens who have already used Citizen Connect to make their communities better.</p>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon">📋</div><div className="stat-value">10,000+</div><div className="stat-label">Complaints Filed</div></div>
            <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">8,500+</div><div className="stat-label">Issues Resolved</div></div>
            <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-value">25,000+</div><div className="stat-label">Registered Citizens</div></div>
            <div className="stat-card"><div className="stat-icon">🏛</div><div className="stat-value">500+</div><div className="stat-label">Officials Onboarded</div></div>
          </div>
        </div>
      </section>
    </>
  );
}
