import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function DayBook() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Day Book</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>View daily transaction records.</p>
        </div>
        <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
          Filter by Date
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No transactions recorded for today.
      </div>
    </div>
  );
}
