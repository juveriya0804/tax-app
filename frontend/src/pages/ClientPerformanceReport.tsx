import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';

export default function ClientPerformanceReport() {
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
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#334155' }}>Client Performance Report</h1>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Last Updated at: 6/24/2026, 2:41:32 PM
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
                <input type="text" value="Mar 24, 2026 - Jun 24, 2026" readOnly style={{ flex: 1, padding: '12px 14px', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#0f172a' }} />
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
      </div>
    </div>
  );
}
