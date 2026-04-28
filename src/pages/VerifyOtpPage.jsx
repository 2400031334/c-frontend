import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function VerifyOtpPage() {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const { loginUser } = useAuth();
  const toast = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
    const timer = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) { toast.error('Please enter the complete 6-digit code'); return; }
    setLoading(true);
    try {
      const { data } = await verifyOtp({ email, code });
      toast.success('Email verified successfully!');
      loginUser(data.token, data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(email);
      setCountdown(60);
      toast.info('New OTP sent to your email');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1>Verify Your Email</h1>
        <p className="auth-subtitle">We sent a 6-digit code to <strong>{email}</strong></p>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((d, i) => (
              <input key={i} ref={(el) => (refs.current[i] = el)} value={d} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} maxLength={1} />
            ))}
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>{loading ? 'Verifying...' : 'Verify Email'}</button>
        </form>
        <div className="auth-footer" style={{ marginTop: 20 }}>
          {countdown > 0 ? (<span>Resend code in {countdown}s</span>) : (<button onClick={handleResend} style={{ background: 'none', border: 'none', color: 'var(--royal)', fontWeight: 600, cursor: 'pointer' }}>Resend OTP</button>)}
        </div>
      </div>
    </div>
  );
}
