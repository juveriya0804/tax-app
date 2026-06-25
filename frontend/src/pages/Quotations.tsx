import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import { ChevronDown, ChevronRight, Download, Plus, X, Filter } from 'lucide-react';

export default function Quotations() {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [graphOpen, setGraphOpen] = useState(false);

  const [quotations, setQuotations] = useState<any[]>([]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadQuotations();
  }, [navigate]);

  const loadQuotations = async () => {
    try {
      const res = await fetchApi('/quotations');
      setQuotations(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Nafter Web Technologies &gt; <span style={{ color: 'var(--text-primary)' }}>Quotations</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Quotations
          </h1>
          <button 
            onClick={() => navigate('/quotations/create')}
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
            <Plus size={18} /> Create Quotation <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'relative' }}>
            <select className="form-input" style={{ width: '250px', background: 'transparent', appearance: 'none', paddingRight: '32px' }}>
              <option>Active Quotation</option>
              <option>Draft Quotation</option>
              <option>Expired Quotation</option>
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
              <Download size={16} /> Download As <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />} Filters
            </div>
            {filtersOpen && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <X size={14} /> Clear All Filters
              </div>
            )}
          </div>

          {filtersOpen && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Quotation Status</label>
                  <select className="form-input" style={{ width: '100%', background: 'white' }}>
                    <option>Select</option>
                    <option>Accepted</option>
                    <option>Pending</option>
                    <option>Rejected</option>
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
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Applied Filters
              </div>
            </>
          )}
        </div>

        {/* Collapsible Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px', padding: '16px 24px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setSummaryOpen(!summaryOpen)}
            >
              {summaryOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />} Quotation Summary
            </div>
            {summaryOpen && (
              <div style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
                Summary details will appear here.
              </div>
            )}
          </div>

          <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px', padding: '16px 24px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => setGraphOpen(!graphOpen)}
            >
              {graphOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />} Quotation Graph
            </div>
            {graphOpen && (
              <div style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
                Graph visualization will appear here.
              </div>
            )}
          </div>

        </div>

        {/* Quotations Table */}
        <div style={{ marginTop: '24px', overflowX: 'auto', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
              <tr>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Quotation No</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Customer</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Issue Date</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Valid Until</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Amount (₹)</th>
                <th style={{ padding: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <td 
                    onClick={() => navigate(`/quotations/${q.id}`)}
                    style={{ padding: '16px', fontWeight: 500, color: 'var(--accent-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {q.quotationNumber}
                  </td>
                  <td style={{ padding: '16px' }}>{q.customer?.name || 'Walk-in'}</td>
                  <td style={{ padding: '16px' }}>{new Date(q.issueDate).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}>{q.validUntil ? new Date(q.validUntil).toLocaleDateString() : '-'}</td>
                  <td style={{ padding: '16px', fontWeight: 600 }}>₹{parseFloat(q.totalAmount || q.amount).toFixed(2)}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem', 
                      background: q.status === 'DRAFT' ? '#f3f4f6' : '#ecfdf5',
                      color: q.status === 'DRAFT' ? '#374151' : '#059669',
                      fontWeight: 600
                    }}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
              {quotations.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No quotations found. Create your first one!
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
