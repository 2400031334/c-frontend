import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cc_cookies')) setTimeout(() => setShow(true), 1500);
  }, []);
  const accept = () => { localStorage.setItem('cc_cookies', 'accepted'); setShow(false); };
  if (!show) return null;
  return (
    <div className="cookie-banner">
      <p>🍪 We use cookies to enhance your experience on Citizen Connect. By continuing, you agree to our use of cookies.</p>
      <div className="cookie-actions">
        <button className="btn btn-sm btn-secondary" onClick={() => setShow(false)}>Decline</button>
        <button className="btn btn-sm btn-primary" onClick={accept}>Accept</button>
      </div>
    </div>
  );
}
