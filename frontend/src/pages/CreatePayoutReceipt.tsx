import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, Calendar } from 'lucide-react';

export default function CreatePayoutReceipt() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(1);

  const toggleSection = (section: number) => {
    setExpandedSection(expandedSection === section ? 0 : section);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', background: '#fafafa', minHeight: '100vh' }}>
      
      {/* Section 1: Select Vendor */}
      <div style={{ background: 'white', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div 
          onClick={() => toggleSection(1)}
          style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: expandedSection === 1 ? '1px solid #f1f5f9' : 'none' }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#334155', fontWeight: 500 }}>1. Select Vendor</h2>
          {expandedSection === 1 ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
        </div>
        
        {expandedSection === 1 && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', color: '#475569', marginBottom: '8px', fontWeight: 500 }}>Payout Receipt No<span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  defaultValue="A00001" 
                  style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', color: '#1e293b', fontSize: '1rem' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#475569', marginBottom: '8px', fontWeight: 500 }}>Payout To<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', appearance: 'none', color: '#94a3b8', fontSize: '1rem', cursor: 'pointer', backgroundColor: 'transparent' }}>
                    <option value="">Select...</option>
                    <option value="1">Vendor 1</option>
                  </select>
                  <ChevronDown size={16} color="#64748b" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: '#475569', marginBottom: '8px', fontWeight: 500 }}>Receipt Date<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    defaultValue="Jun 24, 2026" 
                    style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', color: '#1e293b', fontSize: '1rem' }} 
                  />
                  <Calendar size={16} color="#cbd5e1" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', color: '#475569', marginBottom: '8px', fontWeight: 500 }}>Currency<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', appearance: 'none', color: '#334155', fontSize: '1rem', cursor: 'pointer', backgroundColor: 'transparent' }}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <ChevronDown size={16} color="#64748b" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: '#475569', marginBottom: '8px', fontWeight: 500 }}>Number and Currency Format</label>
                <button type="button" style={{ width: '100%', padding: '12px 16px', background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#475569', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#334155' }}>123</span> Number and Currency Format
                </button>
              </div>
            </div>

            <button type="button" onClick={() => setExpandedSection(2)} style={{ background: '#c084fc', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>
              Continue
            </button>
          </div>
        )}
      </div>

      {/* Section 2: Add Payment Records */}
      <div style={{ background: 'white', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div 
          onClick={() => toggleSection(2)}
          style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#334155', fontWeight: 500 }}>2. Add Payment Records</h2>
          {expandedSection === 2 ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
        </div>
        {expandedSection === 2 && (
          <div style={{ padding: '24px', borderTop: '1px solid #f1f5f9' }}>
             <p style={{ color: '#64748b' }}>Payment records configuration will go here.</p>
          </div>
        )}
      </div>

      {/* Section 3: Settle Unpaid Purchases */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div 
          onClick={() => toggleSection(3)}
          style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#334155', fontWeight: 500 }}>3. Settle Unpaid Purchases</h2>
          {expandedSection === 3 ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
        </div>
        {expandedSection === 3 && (
          <div style={{ padding: '24px', borderTop: '1px solid #f1f5f9' }}>
             <p style={{ color: '#64748b' }}>Settle unpaid purchases configuration will go here.</p>
          </div>
        )}
      </div>

    </div>
  );
}
