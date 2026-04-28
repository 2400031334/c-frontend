import { useState, useEffect } from 'react';

export default function FloatingActionButton({ onFileComplaint, showFile }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fab">
      {showFile && (
        <button className="fab-btn" title="File New Complaint" onClick={onFileComplaint}>✍</button>
      )}
      {showTop && (
        <button className="fab-btn" title="Back to Top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, var(--grey-600), var(--grey-700))' }}>↑</button>
      )}
    </div>
  );
}
