import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import AccountModal from '../components/AccountModal';

export default function BankAccounts() {
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
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Bank Accounts</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage traditional bank accounts and feeds.</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Connect Bank
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No bank accounts connected.
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
