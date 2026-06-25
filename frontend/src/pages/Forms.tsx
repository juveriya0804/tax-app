import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ChevronDown, X } from 'lucide-react';

export default function Forms() {
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
          <span style={{ color: '#64748b' }}>All Forms</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
        </div>

        {/* Title and Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#334155', margin: 0 }}>All Forms</h1>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
          </div>
          
          <button style={{ background: '#e11d48', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '1.05rem', transition: 'background 0.2s' }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 300 }}>+</span> Create Form
          </button>
        </div>

        {/* Main Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '2px solid transparent' }}>
          <div onClick={() => navigate('/all-pipelines')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }}>
            All Sales Pipelines
          </div>
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '2px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
            Forms
          </div>
          <div onClick={() => navigate('/all-leads')} style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }}>
            All Leads
          </div>
          <div style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }}>
            All Meetings
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}>
            Reports & More <span style={{ fontSize: '0.9rem' }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px' }}>
        
        {/* Sub Navigation and Content Container */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          
          <div style={{ borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '32px', marginBottom: '32px' }}>
            <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '2px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
              All Forms
            </div>
            <div style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem' }}>
              Active Forms
            </div>
            <div style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem' }}>
              Inactive Forms
            </div>
            <div style={{ color: '#475569', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem' }}>
              Deleted Forms
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 16px', width: '320px', background: 'white' }}>
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="Search Forms" style={{ border: 'none', outline: 'none', padding: '0 12px', flex: 1, fontSize: '0.95rem', color: '#334155' }} />
              <ArrowRight size={18} color="#94a3b8" />
            </div>
          </div>

          {/* Filters */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, color: '#334155', fontSize: '1.15rem' }}>
                <ChevronDown size={22} />
                Filters
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748b', fontSize: '0.95rem' }}>
                <X size={16} />
                Clear All Filters
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '16px' }}>
                Applied Filters
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px', fontSize: '0.95rem', color: '#334155' }}>
                <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
                <span>Status: All</span>
                <ChevronDown size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          {/* Table Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginBottom: '16px' }}>
            <div style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Showing <span style={{ fontWeight: 600, color: '#334155' }}>1</span> to <span style={{ fontWeight: 600, color: '#334155' }}>1</span> of <span style={{ fontWeight: 600, color: '#334155' }}>1</span> Forms
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#8b5cf6', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

          {/* Table */}
          <div style={{ width: '100%', overflowX: 'auto', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem', color: '#334155' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '16px', fontWeight: 500 }}></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Form Name <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Sales Pipeline</th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Status <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Last Modified <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Captured Leads <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>↑</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Created At <span style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '4px' }}>↓</span><span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '2px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}>Creator <span style={{ color: '#cbd5e1', fontSize: '0.8rem', marginLeft: '4px' }}>▼</span></th>
                  <th style={{ padding: '16px', fontWeight: 500 }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '20px 16px', color: '#64748b' }}>1</td>
                  <td style={{ padding: '20px 16px', borderLeft: '1px solid #e2e8f0' }}>Form 0001</td>
                  <td style={{ padding: '20px 16px' }}>Sales Pipeline</td>
                  <td style={{ padding: '20px 16px' }}>
                    <span style={{ background: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', border: '1px solid #fed7aa', fontWeight: 500 }}>Draft</span>
                  </td>
                  <td style={{ padding: '20px 16px' }}>Jul 25, 2025<br/><span style={{ color: '#64748b', fontSize: '0.9rem' }}>08:03 PM</span></td>
                  <td style={{ padding: '20px 16px' }}>0</td>
                  <td style={{ padding: '20px 16px' }}>Jul 25, 2025<br/><span style={{ color: '#64748b', fontSize: '0.9rem' }}>08:03 PM</span></td>
                  <td style={{ padding: '20px 16px' }}>imran khan</td>
                  <td style={{ padding: '20px 16px', textAlign: 'center', cursor: 'pointer', color: '#64748b' }}>
                    <span style={{ letterSpacing: '2px', fontWeight: 600 }}>...</span><br/><span style={{ fontSize: '0.85rem' }}>More</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Showing <span style={{ fontWeight: 600, color: '#334155' }}>1</span> to <span style={{ fontWeight: 600, color: '#334155' }}>1</span> of <span style={{ fontWeight: 600, color: '#334155' }}>1</span> Forms
            </div>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>⊞</span> Show/Hide Columns
            </button>
          </div>

        </div>

        {/* Recommended For You Banner */}
        <div style={{ background: '#faf8ff', border: '1px solid #f3e8ff', borderRadius: '12px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(139, 92, 246, 0.05)', marginTop: '48px' }}>
          {/* Thick Left Border */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: '#8b5cf6', borderRadius: '6px 0 0 6px' }}></div>
          
          <div>
            <div style={{ display: 'inline-block', background: '#f3e8ff', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              RECOMMENDED FOR YOU
            </div>
            
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', margin: '0 0 16px 0' }}>
              Capture Leads From Your Website and Social Media with Refrens Forms
            </h2>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', color: '#64748b', fontSize: '0.9rem' }}>
                <span style={{ color: '#8b5cf6', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
                Embed Contact Forms to Your Website
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', color: '#64748b', fontSize: '0.9rem' }}>
                <span style={{ color: '#8b5cf6', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
                Add/Share Lead Capture Form Links on Your Socials
              </div>
            </div>
          </div>
          
          <div>
            <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }} onMouseOver={e => e.currentTarget.style.background = '#7c3aed'} onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
              Learn More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
