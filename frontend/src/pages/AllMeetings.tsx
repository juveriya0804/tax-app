import { useNavigate } from 'react-router-dom';

export default function AllMeetings() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Header section */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 0 32px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/all-pipelines')}>Lead Management</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#64748b' }}>All Meetings</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#334155', margin: 0 }}>All Meetings</h1>
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
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '2px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
            All Meetings
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Reports & More <span style={{ fontSize: '0.9rem' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px' }}>
        
        {/* Table Container */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '1.05rem', color: '#64748b' }}>
              No <span style={{ fontWeight: 600, color: '#334155' }}>Meetings</span> Found
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', color: '#8b5cf6', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

          {/* Empty Table */}
          <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e2e8f0', borderBottom: 'none' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem', color: '#334155' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Title</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Lead</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Scheduled Date <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>↑▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Scheduled Time</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Duration (mins)</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Status</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Cancelled At</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Cancelled By <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Created By <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} style={{ height: '300px', borderBottom: '1px solid #e2e8f0', textAlign: 'center', verticalAlign: 'middle', background: 'white' }}>
                    {/* Placeholder for the empty state icon visible at the bottom of the screenshot */}
                    <div style={{ width: '100px', height: '100px', background: '#faf5ff', borderRadius: '50%', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '40px', border: '3px solid #d8b4fe', borderRadius: '8px 8px 0 0' }}></div>
                      <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '8px', background: '#e9d5ff', borderRadius: '4px' }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
