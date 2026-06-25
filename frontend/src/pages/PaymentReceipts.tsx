import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { ChevronDown, Download, Plus, X, Search, Filter } from 'lucide-react';

export default function PaymentReceipts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [receipts, setReceipts] = useState<any[]>([]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
    const saved = JSON.parse(localStorage.getItem('paymentReceipts') || '[]');
    setReceipts(saved);
  }, [navigate]);

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Nafter Web Technologies &gt; <span style={{ color: 'var(--text-primary)' }}>Payment Receipts</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Payment Receipts 
            <span style={{ fontSize: '1.2rem' }}>🔆</span>
          </h1>
          <button 
            onClick={() => navigate('/payment-receipts/create')}
            style={{ 
              background: '#e11d48',
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)'
            }}
          >
            <Plus size={18} /> Create Payment Receipt <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <div 
          onClick={() => setActiveTab('Overview')}
          style={{ 
            padding: '12px 24px', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'Overview' ? 600 : 500,
            color: activeTab === 'Overview' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Overview' ? '2px solid var(--accent-primary)' : '2px solid transparent'
          }}
        >
          Overview
        </div>
        <div 
          onClick={() => setActiveTab('Tag-wise')}
          style={{ 
            padding: '12px 24px', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'Tag-wise' ? 600 : 500,
            color: activeTab === 'Tag-wise' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Tag-wise' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Tag-wise Report <span style={{ fontSize: '1rem' }}>💎</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <select className="form-input" style={{ width: '250px', background: 'transparent' }}>
            <option>Active Payment Receipt</option>
            <option>Draft Payment Receipt</option>
            <option>Deleted Payment Receipt</option>
          </select>

          <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Download size={16} /> Download CSV
          </button>
        </div>

        {/* Filters Section */}
        <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? <ChevronDown size={18} /> : <Filter size={18} />} Filters
            </div>
            {filtersOpen && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <X size={14} /> Clear All Filters
              </div>
            )}
          </div>

          {filtersOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Payment Receipt Status</label>
                <select className="form-input" style={{ width: '100%', background: 'white' }}>
                  <option>Select</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Partial</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Search Client</label>
                <select className="form-input" style={{ width: '100%', background: 'white' }}>
                  <option>All Clients</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Search Contact</label>
                <select className="form-input" style={{ width: '100%', background: 'white' }}>
                  <option>All Contacts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Date Range</label>
                <input type="text" className="form-input" placeholder="Start Date - End Date" style={{ width: '100%', background: 'white' }} />
              </div>
            </div>
          )}
        </div>

        {/* Data Area */}
        <div style={{ marginTop: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Receipt #</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Payment Date</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((rec) => (
                <tr key={rec.id} onClick={() => navigate(`/payment-receipts/${rec.id}`)} className="table-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}>
                  <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{rec.receiptNumber}</td>
                  <td style={{ padding: '20px', fontWeight: 500 }}>{rec.customerName}</td>
                  <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{new Date(rec.paymentDate).toLocaleDateString()}</td>
                  <td style={{ padding: '20px', fontWeight: 600 }}>₹{Number(rec.amount).toFixed(2)}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: '#ecfdf5',
                      color: '#059669'
                    }}>
                      {rec.paymentMode}
                    </span>
                  </td>
                </tr>
              ))}
              {receipts.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ReceiptIcon size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                    <p>No payment receipts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// Temporary icon
function ReceiptIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 17V7"/>
    </svg>
  );
}
