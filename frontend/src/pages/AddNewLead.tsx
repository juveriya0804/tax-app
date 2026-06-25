import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';

export default function AddNewLead() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} />
        </button>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>
            Nafter Web Technologies <span style={{ margin: '0 6px' }}>&gt;</span> Lead Management <span style={{ margin: '0 6px' }}>&gt;</span> <span style={{ color: '#94a3b8' }}>Add New Lead</span>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600, color: '#334155' }}>Add New Lead</h1>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
          
          {/* Accordion Header */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#334155' }}>Contact & Customer Details</h2>
            <ChevronUp size={24} color="#334155" />
          </div>

          {/* Form Content */}
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
              
              {/* Contact Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Contact Name<span style={{ color: '#ef4444' }}>*</span></label>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Full name of the lead contact</span>
                <input type="text" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                <div style={{ fontSize: '0.9rem', color: '#334155', marginTop: '12px' }}>
                  Is it an existing contact? <span style={{ color: '#8b5cf6', cursor: 'pointer', fontWeight: 500 }}>Link Contact</span>
                </div>
              </div>

              {/* Country */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Country<span style={{ color: '#ef4444' }}>*</span></label>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Country of the lead</span>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white', appearance: 'none', fontSize: '0.95rem', color: '#334155' }}>
                    <option>India</option>
                  </select>
                  <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* City */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>City</label>
                <input type="text" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Phone</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <img src="https://flagcdn.com/w20/in.png" alt="India" width="20" style={{ borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>▼</span>
                  </div>
                  <div style={{ padding: '12px 0 12px 12px', color: '#334155', fontSize: '0.95rem', background: 'white' }}>+91</div>
                  <input type="text" style={{ flex: 1, border: 'none', padding: '12px', outline: 'none', fontSize: '0.95rem' }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Email</label>
                <input type="email" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
              </div>

              {/* Designation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Designation</label>
                <input type="text" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
              </div>

              {/* Prospect Organisation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 500, color: '#334155' }}>Prospect Organisation<span style={{ color: '#ef4444' }}>*</span></label>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Company or organisation the lead belongs to</span>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white', appearance: 'none', fontSize: '0.95rem', color: '#64748b' }}>
                    <option>Select...</option>
                  </select>
                  <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                    ▼
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Lead Details Accordion */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
          <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#334155' }}>Lead Details</h2>
            <ChevronDown size={24} color="#334155" />
          </div>
        </div>

        {/* Custom Fields Accordion */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
          <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#334155' }}>Custom Fields</h2>
            <ChevronDown size={24} color="#334155" />
          </div>
        </div>

        {/* Add Lead Action Button */}
        <div>
          <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)' }} onMouseOver={e => e.currentTarget.style.background = '#7c3aed'} onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
            Add Lead
          </button>
        </div>

      </div>
    </div>
  );
}
