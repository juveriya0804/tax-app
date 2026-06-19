import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchApi } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    jurisdiction: 'ONSHORE',
    trn: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      // Registration successful, redirect to login
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 0' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ marginBottom: '8px' }} className="text-gradient">Create Account</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Register your organization to get started</p>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-input" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input name="companyName" type="text" className="form-input" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">TRN (15-digit)</label>
            <input name="trn" type="text" className="form-input" maxLength={15} value={formData.trn} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Jurisdiction</label>
            <select name="jurisdiction" className="form-input" value={formData.jurisdiction} onChange={handleChange}>
              <option value="ONSHORE">Onshore</option>
              <option value="FREE_ZONE">Free Zone</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Register
          </button>
        </form>
        
        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
