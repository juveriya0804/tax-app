import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchApi, setAuthToken } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setAuthToken(res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '8px' }} className="text-gradient">Welcome Back</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Login to your dashboard</p>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Login
          </button>
        </form>
        
        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
