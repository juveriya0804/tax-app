import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken, removeAuthToken } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [custRes, invRes, statsRes] = await Promise.all([
        fetchApi('/billing/customers'),
        fetchApi('/billing/invoices'),
        fetchApi('/reports/dashboard-stats')
      ]);
      setCustomers(custRes.data);
      setInvoices(invRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error(error);
      if ((error as Error).message === 'Unauthorized: Token is invalid or expired') {
        removeAuthToken();
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  const sendReminder = async (invoiceId: string) => {
    try {
      await fetchApi('/whatsapp/send-reminder', {
        method: 'POST',
        body: JSON.stringify({ invoiceId })
      });
      alert('Reminder sent to queue!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Overview</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Your business at a glance.</p>
        </div>
      </div>

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Total Revenue</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--success)' }}>₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Outstanding</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--warning)' }}>₹{stats.totalOutstanding.toFixed(2)}</div>
          </div>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>VAT Collected</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-primary)' }}>₹{stats.totalVatCollected.toFixed(2)}</div>
          </div>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Total Customers</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{stats.customersCount}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Invoices Panel */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 500 }}>Recent Invoices</h3>
          {invoices.length === 0 ? (
            <p className="text-muted">No invoices found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {invoices.map(i => (
                <li key={i.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>INV #{i.invoiceNumber}</div>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                        Amount: ₹{i.totalAmount} | Status: <span style={{ color: i.status === 'PAID' ? 'var(--success)' : 'var(--warning)' }}>{i.status}</span>
                      </div>
                    </div>
                    {i.status === 'UNPAID' && (
                      <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => sendReminder(i.id)}>
                        Remind
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
