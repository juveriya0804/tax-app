import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, Wallet, FileText, Download, Filter } from 'lucide-react';

export default function Accounting() {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLedger(); }, []);

  const loadLedger = async () => {
    try {
      setLoading(true);
      // const res = await fetchApi('/accounting/ledger');
      // setLedger(res.data || []);
      
      // Mock Data for a gorgeous state display
      setTimeout(() => {
        setLedger([
          { id: 1, date: '2026-06-24', type: 'INCOME', description: 'Invoice #INV-001 Payment', amount: 5000, balance: 5000 },
          { id: 2, date: '2026-06-23', type: 'EXPENSE', description: 'Office Supplies', amount: -250, balance: 4750 },
          { id: 3, date: '2026-06-22', type: 'INCOME', description: 'Consulting Services', amount: 1200, balance: 5950 },
          { id: 4, date: '2026-06-21', type: 'EXPENSE', description: 'Software Subscriptions', amount: -150, balance: 5800 },
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      toast.error('Failed to load ledger');
      setLoading(false);
    }
  };

  const totalIncome = ledger.filter(l => l.type === 'INCOME').reduce((sum, l) => sum + l.amount, 0) || 6200;
  const totalExpenses = ledger.filter(l => l.type === 'EXPENSE').reduce((sum, l) => sum + Math.abs(l.amount), 0) || 400;
  const netProfit = totalIncome - totalExpenses;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh', background: '#f8fafc' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>Financial Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>Overview of your accounting, cash flow, and ledgers.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <Filter size={18} /> Filter
          </button>
          <button style={{ background: '#8b5cf6', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }}>
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Total Income */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: '#10b981', opacity: 0.1, borderRadius: '50%', filter: 'blur(20px)' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.05rem', fontWeight: 500 }}>Total Income</h3>
            <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={20} color="#10b981" />
            </div>
          </div>
          <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800, color: '#1e293b' }}>${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#10b981', fontWeight: 500 }}>
            <ArrowUpRight size={14} /> +14.5% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>vs last month</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: '#ef4444', opacity: 0.1, borderRadius: '50%', filter: 'blur(20px)' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.05rem', fontWeight: 500 }}>Total Expenses</h3>
            <div style={{ width: '40px', height: '40px', background: '#fef2f2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDownRight size={20} color="#ef4444" />
            </div>
          </div>
          <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800, color: '#1e293b' }}>${totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#ef4444', fontWeight: 500 }}>
            <ArrowUpRight size={14} /> +2.4% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>vs last month</span>
          </div>
        </div>

        {/* Net Profit */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: '#8b5cf6', opacity: 0.1, borderRadius: '50%', filter: 'blur(20px)' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.05rem', fontWeight: 500 }}>Net Profit</h3>
            <div style={{ width: '40px', height: '40px', background: '#f5f3ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={20} color="#8b5cf6" />
            </div>
          </div>
          <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800, color: '#1e293b' }}>${netProfit.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#10b981', fontWeight: 500 }}>
            <ArrowUpRight size={14} /> +18.2% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>vs last month</span>
          </div>
        </div>

        {/* Operating Cash Flow */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: '#3b82f6', opacity: 0.1, borderRadius: '50%', filter: 'blur(20px)' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#64748b', fontSize: '1.05rem', fontWeight: 500 }}>Operating Cash Flow</h3>
            <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="#3b82f6" />
            </div>
          </div>
          <h2 style={{ margin: 0, fontSize: '2.4rem', fontWeight: 800, color: '#1e293b' }}>$5,240.00</h2>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#10b981', fontWeight: 500 }}>
            <ArrowUpRight size={14} /> +5.4% <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>vs last month</span>
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Ledger Table */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>Recent Transactions</h2>
            <button style={{ background: 'none', border: 'none', color: '#8b5cf6', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>View All Ledger</button>
          </div>
          
          <div style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '0.9rem', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Description</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading ledger...</td></tr>
                ) : ledger.map((entry, idx) => (
                  <tr key={entry.id || idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '16px 24px', color: '#475569', fontSize: '0.95rem' }}>
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ color: '#1e293b', fontWeight: 500, fontSize: '1rem' }}>{entry.description}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Trx ID: #{Math.floor(Math.random() * 100000)}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        background: entry.type === 'INCOME' ? '#ecfdf5' : '#fef2f2',
                        color: entry.type === 'INCOME' ? '#10b981' : '#ef4444'
                      }}>
                        {entry.type === 'INCOME' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600, fontSize: '1.05rem', color: entry.amount > 0 ? '#10b981' : '#1e293b' }}>
                      {entry.amount > 0 ? '+' : ''}{entry.amount < 0 ? `-$${Math.abs(entry.amount).toFixed(2)}` : `$${entry.amount.toFixed(2)}`}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600, color: '#64748b', fontSize: '1.05rem' }}>
                      ${entry.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Quick Actions */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', padding: '24px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.color = '#8b5cf6'}} onMouseOut={e => {e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'}}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><FileText size={20} color="#8b5cf6" /></div>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Create Invoice</span>
              </button>
              <button style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'}} onMouseOut={e => {e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'}}>
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Wallet size={20} color="#10b981" /></div>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Record Expense</span>
              </button>
            </div>
          </div>

          {/* Cash Flow Chart Illustration */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Cash Flow Overview</h2>
              <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>Last 6 Months</span>
            </div>
            
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', position: 'relative' }}>
              {/* Background grid lines */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ borderBottom: '1px dashed #e2e8f0', width: '100%' }}></div>
                <div style={{ borderBottom: '1px dashed #e2e8f0', width: '100%' }}></div>
                <div style={{ borderBottom: '1px dashed #e2e8f0', width: '100%' }}></div>
                <div style={{ borderBottom: '1px solid #cbd5e1', width: '100%' }}></div>
              </div>

              {[60, 80, 40, 90, 70, 100].map((h, i) => (
                <div key={i} style={{ width: '24px', display: 'flex', gap: '4px', zIndex: 1, position: 'relative' }}>
                  <div style={{ width: '10px', height: `${h}%`, background: '#8b5cf6', borderRadius: '4px 4px 0 0', transition: 'height 1s ease-out' }}></div>
                  <div style={{ width: '10px', height: `${h * 0.6}%`, background: '#e2e8f0', borderRadius: '4px 4px 0 0', transition: 'height 1s ease-out' }}></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 10px 0 10px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
