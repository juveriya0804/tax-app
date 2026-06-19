import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function DeliveryChallans() {
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
          <h1 className="text-gradient">Delivery Challans</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your delivery challans.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Create Delivery Challan
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No delivery challans found. Click "Create Delivery Challan" to get started.
      </div>
    </div>
  );
}
