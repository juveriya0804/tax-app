import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

export default function PaymentAccounts() {
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
          <h1 className="text-gradient">Payment Accounts</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage digital wallets and payment gateways.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Add Account
        </button>
      </div>

      {/* Recommended Integration Banner */}
      <div style={{ background: '#faf8ff', border: '1px solid #f3e8ff', borderRadius: '12px', padding: '24px 32px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.05)' }}>
        {/* Thick Left Border */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: '#8b5cf6', borderRadius: '6px 0 0 6px' }}></div>
        
        <div>
          <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            RECOMMENDED FOR YOU
          </div>
          
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', margin: '0 0 16px 0' }}>
            Automate Bank Reconciliation
          </h2>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', color: '#64748b', fontSize: '0.9rem' }}>
            <span style={{ color: '#8b5cf6', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
            Securely connect your bank to fetch statements for seamless reconciliation.
          </div>
        </div>
        
        <div>
          <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }} onMouseOver={e => e.currentTarget.style.background = '#7c3aed'} onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
            Connect Now
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        Download our app
        <span style={{ fontSize: '1.2rem' }}>▶️</span>
        <span style={{ fontSize: '1.2rem', color: '#0f172a' }}></span>
      </div>
    </div>
  );
}
