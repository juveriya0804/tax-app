import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit2, Plus, Settings, X, ChevronDown, Percent, TableProperties } from 'lucide-react';

export default function CreateDebitNote() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    debitNoteNo: 'A00001',
    debitNoteDate: '2026-06-24',
    dueDate: '2026-07-09',
    linkInvoice: '',
    reason: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Debit Note created successfully!');
    navigate('/debit-notes');
  };

  return (
    <div style={{ padding: '0 0 60px 0', maxWidth: '1200px', margin: '0 auto', background: '#fafafa', minHeight: '100vh' }}>
      
      {/* Top Header */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <button 
            type="button"
            onClick={() => navigate('/debit-notes')}
            style={{ position: 'absolute', left: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#334155', margin: 0 }}>Create New Debit Note</h1>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', fontWeight: 500 }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</div>
            Debit Note Details
          </div>
          <div style={{ color: '#cbd5e1' }}>&gt;</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</div>
            Design & Share <span style={{ opacity: 0.7 }}>(optional)</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 24px' }}>
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '8px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          
          {/* Form Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#334155', margin: 0, borderBottom: '2px dashed #cbd5e1', paddingBottom: '4px' }}>Debit Note</h2>
              <Edit2 size={18} color="var(--text-secondary)" style={{ cursor: 'pointer', marginLeft: '8px' }} />
            </div>
            <button type="button" style={{ background: 'none', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', cursor: 'pointer', fontWeight: 500 }}>
              <Plus size={16} /> Add Subtitle
            </button>
          </div>

          {/* Form Layout */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
            
            {/* Left Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '550px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '180px' }}>
                  <label style={{ color: '#334155', fontWeight: 500, borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px', display: 'inline-block', fontSize: '1.05rem' }}>Debit Note No<span style={{ color: '#ef4444' }}>*</span></label>
                </div>
                <input 
                  type="text" 
                  value={formData.debitNoteNo}
                  onChange={e => setFormData({...formData, debitNoteNo: e.target.value})}
                  style={{ flex: 1, border: 'none', borderBottom: '1px solid #e2e8f0', padding: '8px 0', outline: 'none', fontSize: '1.05rem', color: '#1e293b', marginLeft: '16px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '180px' }}>
                  <label style={{ color: '#334155', fontWeight: 500, borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px', display: 'inline-block', fontSize: '1.05rem' }}>Debit Note Date<span style={{ color: '#ef4444' }}>*</span></label>
                </div>
                <div style={{ flex: 1, position: 'relative', marginLeft: '16px' }}>
                  <input 
                    type="date" 
                    value={formData.debitNoteDate}
                    onChange={e => setFormData({...formData, debitNoteDate: e.target.value})}
                    style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '8px 0', outline: 'none', fontSize: '1.05rem', color: '#1e293b' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '180px' }}>
                  <label style={{ color: '#334155', fontWeight: 500, borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px', display: 'inline-block', fontSize: '1.05rem' }}>Due Date</label>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e2e8f0', padding: '8px 0', marginLeft: '16px' }}>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.05rem', color: '#1e293b', padding: 0 }}
                  />
                  <Settings size={18} color="#64748b" style={{ cursor: 'pointer' }} />
                  <X size={18} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setFormData({...formData, dueDate: ''})} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '180px' }}>
                  <label style={{ color: '#334155', fontWeight: 500, display: 'inline-block', fontSize: '1.05rem' }}>Link Invoice</label>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '8px 0', marginLeft: '16px', cursor: 'pointer' }}>
                  <span style={{ flex: 1, color: '#64748b', fontSize: '1.05rem' }}>Select Invoice</span>
                  <ChevronDown size={20} color="#1e293b" />
                </div>
              </div>

              {/* Full width select reason */}
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '8px 0', cursor: 'pointer', marginTop: '8px' }}>
                <span style={{ flex: 1, color: '#64748b', fontSize: '1.05rem' }}>Select reason (REQUIRED)</span>
                <ChevronDown size={20} color="#1e293b" />
              </div>

              {/* Add Custom Fields */}
              <div style={{ marginTop: '8px' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: 500 }}>
                  <Plus size={18} /> Add Custom Fields
                </button>
              </div>

            </div>
          </div>

          {/* Issued By / Issued To */}
          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
              {/* Issued By */}
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: '8px', padding: '24px', border: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#1e293b', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', display: 'inline-block' }}>
                  Issued By <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>(Your Details)</span>
                </h3>
                
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>N</div>
                      <span style={{ color: '#334155', fontWeight: 500 }}>Nafter Web Technologies</span>
                    </div>
                    <ChevronDown size={16} color="#64748b" />
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#334155' }}>Nafter</div>
                    <button type="button" style={{ background: 'none', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    8/2 1st East Main Road SBI SME Building, vellore, Tamil Nadu, India -<br/>632004
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '0.95rem', color: '#64748b' }}>
                    <div>GSTIN</div><div style={{ color: '#334155' }}>33ADAPI6913R1ZB</div>
                    <div>PAN</div><div style={{ color: '#334155' }}>ADAPI6913R</div>
                  </div>
                </div>
              </div>

              {/* Issued To */}
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: '8px', padding: '24px', border: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#1e293b', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', display: 'inline-block' }}>
                  Issued To <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>(Client's Details)</span>
                </h3>

                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ padding: '12px 16px', background: 'white', border: '1px solid #a78bfa', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 0 0 2px rgba(167,139,250,0.1)' }}>
                    <span style={{ color: '#94a3b8' }}>Select a Client</span>
                    <ChevronDown size={16} color="#1e293b" />
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '176px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>Select Client/Business from the list</div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>OR</div>
                  <button type="button" style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer' }}>
                    <Plus size={16} /> Add New Client
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row Configs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <button type="button" style={{ flex: 1, padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#334155', fontWeight: 500, cursor: 'pointer' }}>
                <Percent size={16} color="#8b5cf6" /> Configure GST
              </button>
              
              <div style={{ flex: 1, position: 'relative' }}>
                <label style={{ position: 'absolute', top: '-24px', left: 0, fontSize: '0.85rem', color: '#475569' }}>Currency<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ color: '#334155', fontWeight: 500 }}>Indian Rupee(INR, ₹)</span>
                  <ChevronDown size={16} color="#334155" />
                </div>
              </div>

              <button type="button" style={{ flex: 1, padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#334155', fontWeight: 500, cursor: 'pointer' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#8b5cf6' }}>123</span> Number and Currency Format
              </button>

              <button type="button" style={{ flex: 1, padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#334155', fontWeight: 500, cursor: 'pointer' }}>
                <TableProperties size={16} color="#8b5cf6" /> Edit Columns/Formulas
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
