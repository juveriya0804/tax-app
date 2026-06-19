import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function HireVendors() {
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
          <h1 className="text-gradient">Hire The Best Vendors</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Find and hire top-rated vendors in the network.</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Vendor directory coming soon...
      </div>
    </div>
  );
}
