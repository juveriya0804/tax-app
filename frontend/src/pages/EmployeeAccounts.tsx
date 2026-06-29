import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Download } from 'lucide-react';
import AccountModal from '../components/AccountModal';
import { getAuthToken, fetchApi } from '../services/api';

export default function EmployeeAccounts() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const loadAccounts = async () => {
    try {
      const data = await fetchApi('/accounting/accounts');
      setAccounts(data);
    } catch (err) {
      console.error('Failed to load accounts', err);
    }
  };

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    } else {
      loadAccounts();
    }
  }, [navigate]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 0 32px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }}>Nafter Web Technologies</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#94a3b8' }}>Payment Accounts</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#334155', margin: 0 }}>Payment Accounts</h1>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#e11d48', color: 'white', border: '1px solid #be123c', borderRight: 'none', padding: '10px 20px', borderRadius: '6px 0 0 6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '1rem', zIndex: 10, position: 'relative' }}>
              <span style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 300 }}>+</span> New Payments Account
            </button>
            <button style={{ background: '#be123c', color: 'white', border: '1px solid #9f1239', borderLeft: '1px solid #f43f5e', padding: '0 12px', borderRadius: '0 6px 6px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0' }}>
          <div onClick={() => navigate('/payment-accounts')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            All Payment Accounts
          </div>
          <div onClick={() => navigate('/bank-accounts')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Bank Accounts
          </div>
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '3px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
            Employee Accounts
          </div>
          <div onClick={() => navigate('/bank-reconciliation')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Bank Reconciliation
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem' }}>
            Refrens Payments
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px' }}>
        
        {/* Sub Tabs */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '2px solid #8b5cf6', cursor: 'pointer', fontSize: '1rem' }}>
            Active Accounts
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1rem' }}>
            Inactive Accounts
          </div>
        </div>

        {/* Download Button Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '10px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Download size={18} color="#64748b" /> Download CSV
          </button>
        </div>

        {/* Table Section */}
        <div style={{ marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '1rem', color: '#64748b' }}>
              No <span style={{ fontWeight: 600, color: '#334155' }}>Employee</span> Found
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#8b5cf6', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

          {/* Table Container */}
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e2e8f0', borderBottom: 'none', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem', color: '#334155' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '16px 24px', width: '40px' }}><div style={{ width: '16px', height: '16px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#f1f5f9' }}></div></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Employee ID <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Name <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Department <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Level <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Phone: <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Country: <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Currency <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>↑ ▼</span></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Created At <span style={{ color: '#1e293b', marginLeft: '4px' }}>↓</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                   <td colSpan={9} style={{ height: '80px', background: 'white', borderBottom: '1px solid #e2e8f0' }}></td>
                </tr>
              </tbody>
            </table>
          </div>
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

      <AccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSaved={loadAccounts} 
        accounts={accounts} 
      />
    </div>
  );
}
