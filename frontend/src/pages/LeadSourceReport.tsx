import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Download } from 'lucide-react';

export default function LeadSourceReport() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 0 32px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#94a3b8' }}>Lead Management</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#334155', margin: 0 }}>Lead Management</h1>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <button onClick={() => navigate('/leads/create')} style={{ background: '#e11d48', color: 'white', border: '2px solid #0f172a', padding: '10px 20px', borderRadius: '6px 0 0 6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '1rem', zIndex: 10, position: 'relative' }}>
              <span style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 300 }}>+</span> Add New
            </button>
            <button style={{ background: '#be123c', color: 'white', border: 'none', padding: '0 12px', borderRadius: '0 6px 6px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '2px solid transparent' }}>
          <div onClick={() => navigate('/all-pipelines')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            All Sales Pipelines
          </div>
          <div onClick={() => navigate('/forms')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            Forms
          </div>
          <div onClick={() => navigate('/all-leads')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            All Leads
          </div>
          <div onClick={() => navigate('/all-meetings')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            All Meetings
          </div>
          <div style={{ color: '#64748b', fontWeight: 600, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Reports & More <span style={{ fontSize: '0.9rem' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px' }}>
        
        {/* Report Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#334155' }}>Lead Source Report</h1>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Last Updated at: 6/25/2026, 10:34:02 AM
          </div>
        </div>

        {/* Filters Container */}
        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '32px', border: '1px solid #f1f5f9' }}>
          
          <h2 style={{ margin: '0 0 32px 0', fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>Filters</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 24px' }}>
            
            {/* Lead Created At */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Lead Created At<span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
                <input type="text" value="Mar 25, 2026 - Jun 25, 2026" readOnly style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#0f172a' }} />
                <div style={{ padding: '0 16px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  <Calendar size={18} />
                </div>
              </div>
            </div>

            {/* Lead Closed At */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Lead Closed At</label>
              <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
                <input type="text" placeholder="Start Date - End date" readOnly style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#94a3b8' }} />
                <div style={{ padding: '0 16px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  <Calendar size={18} />
                </div>
              </div>
            </div>

            {/* Pipeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Pipeline<span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', appearance: 'none', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#334155' }}>
                  <option>Sales Pipeline</option>
                </select>
                <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#334155' }}>
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Assigned To */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>Assigned To</label>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Select" readOnly style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', outline: 'none', fontSize: '0.95rem', color: '#94a3b8', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Action Button Container */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button style={{ background: '#f472b6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.01em', height: '45px' }} onMouseOver={e => e.currentTarget.style.background = '#ec4899'} onMouseOut={e => e.currentTarget.style.background = '#f472b6'}>
                Apply Filters
              </button>
            </div>

          </div>
        </div>

        {/* Download Button Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px', marginBottom: '24px' }}>
          <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '10px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Download size={18} color="#64748b" /> Download CSV
          </button>
        </div>

        {/* Table Section */}
        <div style={{ marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '1rem', color: '#64748b' }}>
              Showing <span style={{ fontWeight: 600, color: '#334155' }}>1</span> to <span style={{ fontWeight: 600, color: '#334155' }}>1</span> of <span style={{ fontWeight: 600, color: '#334155' }}>1</span> Source
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#8b5cf6', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

          {/* Table Container */}
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem', color: '#334155' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '16px 24px', width: '40px' }}><input type="checkbox" style={{ cursor: 'pointer', accentColor: '#8b5cf6' }} /></th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Lead Source</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Total Revenue</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Lead Conversion Rate (%)</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Leads Generated</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Open Leads</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Closed Leads</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Lost Leads</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Not Serviceable</th>
                  <th style={{ padding: '16px 24px', fontWeight: 500, whiteSpace: 'nowrap' }}>Avg.</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px' }}><input type="checkbox" style={{ cursor: 'pointer', accentColor: '#8b5cf6' }} /></td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>Quotation</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>₹0</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>0%</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>4</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>4</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>0</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>0</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>0</td>
                  <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>₹0</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div style={{ fontSize: '1rem', color: '#64748b' }}>
              Showing <span style={{ fontWeight: 600, color: '#334155' }}>1</span> to <span style={{ fontWeight: 600, color: '#334155' }}>1</span> of <span style={{ fontWeight: 600, color: '#334155' }}>1</span> Source
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#8b5cf6', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

        </div>

        {/* Recommended Integration Banner */}
        <div style={{ background: '#faf8ff', border: '1px solid #f3e8ff', borderRadius: '12px', padding: '24px 32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.05)' }}>
          {/* Thick Left Border */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: '#8b5cf6', borderRadius: '6px 0 0 6px' }}></div>
          
          <div>
            <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              RECOMMENDED FOR YOU
            </div>
            
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', margin: '0 0 16px 0' }}>
              Automatically Capture Leads from Third-party Platforms
            </h2>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', color: '#64748b', fontSize: '0.9rem' }}>
              <span style={{ color: '#8b5cf6', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
              Integrate Refrens with IndiaMART, TradeIndia, and Meta (Instagram/Facebook)
            </div>
          </div>
          
          <div>
            <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }} onMouseOver={e => e.currentTarget.style.background = '#7c3aed'} onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
              Integrate Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
