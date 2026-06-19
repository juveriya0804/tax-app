import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function DebitNotes() {
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
          <h1 className="text-gradient">Debit Notes</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your debit notes.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Create Debit Note
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No debit notes found. Click "Create Debit Note" to get started.
      </div>
    </div>
  );
}
