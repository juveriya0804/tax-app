import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

export default function Accounting() {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLedger(); }, []);

  const loadLedger = async () => {
    try {
      setLoading(true);
      const res = await fetchApi('/accounting/ledger');
      setLedger(res.data || []);
    } catch (err) {
      toast.error('Failed to load ledger');
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = ledger.filter(l => l.type === 'INCOME').reduce((sum, l) => sum + l.amount, 0);
  const totalExpenses = ledger.filter(l => l.type === 'EXPENSE').reduce((sum, l) => sum + Math.abs(l.amount), 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-gradient" style={{ marginBottom: '24px' }}>Accounting Ledger</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '8px' }}>Total Income</h3>
          <h2 style={{ color: 'var(--success)', margin: 0 }}>${totalIncome.toFixed(2)}</h2>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '8px' }}>Total Expenses</h3>
          <h2 style={{ color: 'var(--danger)', margin: 0 }}>${totalExpenses.toFixed(2)}</h2>
        </div>
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '8px' }}>Net Profit</h3>
          <h2 style={{ color: netProfit >= 0 ? 'var(--accent-primary)' : 'var(--danger)', margin: 0 }}>
            ${netProfit.toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '16px' }}>Transaction History</h3>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Type</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px' }}>{new Date(entry.date).toLocaleDateString()}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      background: entry.type === 'INCOME' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: entry.type === 'INCOME' ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {entry.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{entry.description}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: entry.amount > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {entry.amount > 0 ? '+' : ''}{entry.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>
                    ${entry.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
              {ledger.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
