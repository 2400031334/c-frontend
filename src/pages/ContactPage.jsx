import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">Have questions or need assistance? Reach out to our team and we'll respond within 24 hours.</p>
        </div>
        <div className="contact-grid">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            </div>
          </div>
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="icon">📧</div>
              <div><h4>Email</h4><p>support@citizenconnect.gov</p></div>
            </div>
            <div className="contact-info-card">
              <div className="icon">📞</div>
              <div><h4>Phone</h4><p>1800-CITIZEN (toll-free)</p></div>
            </div>
            <div className="contact-info-card">
              <div className="icon">📍</div>
              <div><h4>Office</h4><p>Digital Governance Wing, New Delhi, India — 110001</p></div>
            </div>
            <div className="contact-info-card">
              <div className="icon">🕐</div>
              <div><h4>Working Hours</h4><p>Mon–Fri, 9:00 AM – 6:00 PM IST</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
