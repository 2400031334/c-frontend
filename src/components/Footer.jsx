import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🏛 Citizen Connect</h3>
            <p>Empowering citizens through transparent governance. A digital platform bridging the gap between public grievances and government action.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/select-role">Register</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Citizen Connect. All rights reserved. A Government Initiative for Digital Governance.</p>
        </div>
      </div>
    </footer>
  );
}
