import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function ProfitLoss() {
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
          <h1 className="text-gradient">Profit & Loss</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>View your revenues, costs, and expenses.</p>
        </div>
        <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
          Export PDF
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Insufficient data to generate profit and loss statement.
      </div>
    </div>
  );
}
