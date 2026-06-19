import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import AccountModal from '../components/AccountModal';
import { Edit2, Trash2 } from 'lucide-react';

export default function ChartOfAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    } else {
      loadAccounts();
    }
  }, [navigate]);

  const loadAccounts = async () => {
    try {
      const res = await fetchApi('/accounting/accounts');
      setAccounts(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    try {
      await fetchApi(`/accounting/accounts/${id}`, { method: 'DELETE' });
      loadAccounts();
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Chart of Accounts</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your general ledger accounts.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Add Account
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading accounts...</div>
        ) : accounts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No accounts found. Click "Add Account" to get started.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Code</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Parent</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#334155' }}>{account.code}</td>
                  <td style={{ padding: '16px', fontWeight: 500, color: '#0f172a' }}>{account.name}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600,
                      background: account.type === 'ASSET' ? '#dcfce7' : account.type === 'LIABILITY' ? '#fee2e2' : account.type === 'REVENUE' ? '#dbeafe' : account.type === 'EXPENSE' ? '#fef3c7' : '#f3f4f6',
                      color: account.type === 'ASSET' ? '#166534' : account.type === 'LIABILITY' ? '#991b1b' : account.type === 'REVENUE' ? '#1e40af' : account.type === 'EXPENSE' ? '#92400e' : '#374151'
                    }}>
                      {account.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem' }}>
                    {account.parentAccount ? `${account.parentAccount.code} - ${account.parentAccount.name}` : '-'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(account)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '12px' }}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(account.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AccountModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadAccounts}
        account={selectedAccount}
        accounts={accounts}
      />
    </div>
  );
}
