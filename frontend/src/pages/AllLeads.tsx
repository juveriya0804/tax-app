import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreHorizontal } from 'lucide-react';

export default function AllLeads() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Header section */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 0 32px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#94a3b8' }}>Lead Management</span>
        </div>

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

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '2px solid transparent' }}>
          <div onClick={() => navigate('/all-pipelines')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            All Sales Pipelines
          </div>
          <div onClick={() => navigate('/forms')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            Forms
          </div>
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '2px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
            All Leads
          </div>
          <div style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#475569'}>
            All Meetings
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Reports & More <span style={{ fontSize: '0.9rem' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px' }}>
        
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

        {/* Sales Pipeline Card */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#334155', margin: 0 }}>Sales Pipeline</h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 16px', borderRadius: '6px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'}} onMouseOut={e => {e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'}}>
                View Leads
              </button>
              <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 16px', borderRadius: '6px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'}} onMouseOut={e => {e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'}}>
                Edit Pipeline
              </button>
              <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'}} onMouseOut={e => {e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'}}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 32px 0', maxWidth: '600px', lineHeight: '1.6' }}>
            This is a sample description of your Sales Pipeline - A way to track your potential leads as they progress through different statuses.
          </p>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            
            {[
              { label: 'Contacted', count: '42' },
              { label: 'No response', count: '0' },
              { label: 'Connected', count: '0' },
              { label: 'Warm', count: '0' },
              { label: 'Deal Done', count: '0' },
              { label: 'Lost', count: '0' },
              { label: 'Not Serviceable', count: '0' },
            ].map((status, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>{status.label}</span>
                <span style={{ color: '#334155', fontSize: '1.15rem', fontWeight: 700 }}>{status.count}</span>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
