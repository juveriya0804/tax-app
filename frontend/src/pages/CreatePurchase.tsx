import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit2, Plus, Calendar, Settings, X, Image as ImageIcon, ChevronDown, Percent, Hash, TableProperties, Copy, Search, Scale, Gem, Eye, EyeOff, Tag, PlusSquare } from 'lucide-react';

export default function CreatePurchase() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    expenseNo: 'A00001',
    invoiceNo: '',
    purchaseDate: '2026-06-23',
    dueDate: '2026-07-08'
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Purchase created successfully!');
    navigate('/purchases');
  };

  return (
    <div style={{ padding: '0 0 60px 0', maxWidth: '1200px', margin: '0 auto', background: '#fafafa', minHeight: '100vh' }}>
      
      {/* Top Header */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <button 
            type="button"
            onClick={() => navigate('/purchases')}
            style={{ position: 'absolute', left: 0, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>Create New Purchase</h1>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', fontWeight: 500 }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</div>
            Purchase Details
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
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>Purchase</h2>
              <Edit2 size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            </div>
            <button type="button" style={{ background: 'none', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', cursor: 'pointer', fontWeight: 500 }}>
              <Plus size={14} /> Add Subtitle
            </button>
          </div>

          {/* Form Layout */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
            
            {/* Left Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '140px', color: '#475569', fontWeight: 500 }}>Expense No<span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  value={formData.expenseNo}
                  onChange={e => setFormData({...formData, expenseNo: e.target.value})}
                  style={{ flex: 1, border: 'none', borderBottom: '1px solid #e2e8f0', padding: '8px 0', outline: 'none', fontSize: '1rem', color: '#1f2937' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '140px', color: '#475569', fontWeight: 500 }}>Invoice No</label>
                <input 
                  type="text" 
                  placeholder="Enter Invoice Number"
                  value={formData.invoiceNo}
                  onChange={e => setFormData({...formData, invoiceNo: e.target.value})}
                  style={{ flex: 1, border: 'none', borderBottom: '1px solid #e2e8f0', padding: '8px 0', outline: 'none', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '140px', color: '#475569', fontWeight: 500 }}>Purchase Date<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input 
                    type="date" 
                    value={formData.purchaseDate}
                    onChange={e => setFormData({...formData, purchaseDate: e.target.value})}
                    style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '8px 0', outline: 'none', fontSize: '1rem', color: '#1f2937' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '140px', color: '#475569', fontWeight: 500 }}>Due Date</label>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e2e8f0', padding: '8px 0' }}>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', color: '#1f2937', padding: 0 }}
                  />
                  <Settings size={16} color="#64748b" style={{ cursor: 'pointer' }} />
                  <X size={16} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setFormData({...formData, dueDate: ''})} />
                </div>
              </div>

            </div>

            {/* Right Column (Logo) */}
            <div style={{ width: '300px' }}>
              <div style={{ 
                border: '1px dashed #cbd5e1', 
                borderRadius: '8px', 
                background: '#f8fafc',
                padding: '40px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
                  <ImageIcon size={24} color="#8b5cf6" />
                </div>
                <div style={{ fontWeight: 500, color: '#475569', marginBottom: '8px' }}>Add Business Logo</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Resolution up to 1080x1080px.<br/>PNG or JPEG file.
                </div>
              </div>
            </div>

          </div>

          {/* New Section: Billed To / Billed By */}
          <div style={{ marginTop: '48px' }}>
            <button type="button" style={{ background: 'none', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 500, marginBottom: '16px' }}>
              <Plus size={16} /> Add Custom Fields
            </button>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
              {/* Billed To */}
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: '8px', padding: '24px', border: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#1e293b', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', display: 'inline-block' }}>
                  Billed To <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>(Your Details)</span>
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

              {/* Billed By */}
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: '8px', padding: '24px', border: '1px solid #f1f5f9' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#1e293b', borderBottom: '1px dashed #cbd5e1', paddingBottom: '8px', display: 'inline-block' }}>
                  Billed By <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>(Vendor's Details)</span>
                </h3>

                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ padding: '12px 16px', background: 'white', border: '1px solid #8b5cf6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ color: '#64748b' }}>Select Vendor By Bill</span>
                    <ChevronDown size={16} color="#64748b" />
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '176px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>Select Vendor/Business from the list</div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>OR</div>
                  <button type="button" style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer' }}>
                    <Plus size={16} /> Add New Vendor
                  </button>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="shipping-details" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', accentColor: '#8b5cf6' }} />
              <label htmlFor="shipping-details" style={{ color: '#334155', fontWeight: 500, cursor: 'pointer' }}>Add Shipping Details</label>
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
                <Hash size={16} color="#8b5cf6" /> Number and Currency Format
              </button>

              <button type="button" style={{ flex: 1, padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#334155', fontWeight: 500, cursor: 'pointer' }}>
                <TableProperties size={16} color="#8b5cf6" /> Edit Columns/Formulas
              </button>
            </div>
          </div>

          {/* Items Table Section */}
          <div style={{ marginTop: '48px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#8b5cf6', color: 'white', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', padding: '12px 16px', fontSize: '0.9rem', fontWeight: 500 }}>
              <div>Item</div>
              <div>HSN/SAC</div>
              <div>GST Rate</div>
              <div>Quantity</div>
              <div>Rate</div>
              <div>Amount</div>
              <div>CGST</div>
              <div>SGST</div>
              <div>Total</div>
            </div>

            {/* Row Content */}
            <div style={{ background: 'white', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.1rem' }}>1.</span>
                <div style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                  <Copy size={18} style={{ cursor: 'pointer' }} />
                  <X size={18} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Inputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <input type="text" placeholder="Item Name / SKU Id" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155' }} />
                  <Hash size={14} color="#94a3b8" style={{ margin: '0 8px' }} />
                  <Search size={14} color="#94a3b8" />
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <input type="text" defaultValue="0" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155' }} />
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Percent size={12} color="#94a3b8" />
                  <input type="text" defaultValue="1" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155' }} />
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <input type="text" defaultValue="1" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155' }} />
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <input type="text" defaultValue="₹ 1" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155' }} />
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontSize: '0.95rem', color: '#64748b' }}>
                  ₹1.00
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontSize: '0.95rem', color: '#64748b' }}>
                  ₹0.00
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontSize: '0.95rem', color: '#64748b' }}>
                  ₹0.00
                </div>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>
                  ₹1.00
                </div>
              </div>

              {/* Sub controls under item */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '350px' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <Plus size={16} color="#8b5cf6" /> Add Description
                  </button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <ImageIcon size={16} color="#8b5cf6" /> Add Image
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem', width: '130px', justifyContent: 'flex-start' }}>
                    <Scale size={16} color="#8b5cf6" /> Add Unit
                  </button>
                  <div style={{ flex: 1, borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#475569', fontSize: '0.95rem' }}>
                    Product <ChevronDown size={16} color="#64748b" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.95rem', fontWeight: 600 }}>
                  Select Purchase Ledger <Gem size={16} color="#f97316" fill="#f97316" fillOpacity={0.3} />
                </div>

                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.95rem' }}>
                  Select any ITC <ChevronDown size={16} color="#64748b" />
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '16px', padding: '16px', background: '#f8fafc', borderTop: '1px dashed #cbd5e1' }}>
              <button type="button" style={{ flex: 1, padding: '14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#64748b', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem' }}>
                <Plus size={18} color="#8b5cf6" /> Add New Line
              </button>
              <button type="button" style={{ flex: 1, padding: '14px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#64748b', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem' }}>
                <Plus size={18} color="#8b5cf6" /> Add New Group
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '400px', background: 'white' }}>
              {/* Top part */}
              <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155' }}>Show Total in PDF</div>
                  <Eye size={18} color="#64748b" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#475569' }}>
                  <span>Amount</span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>₹1.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#475569' }}>
                  <span>SGST</span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>₹0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#475569' }}>
                  <span>CGST</span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>₹0.00</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '16px', cursor: 'pointer' }}>
                  <Tag size={16} color="#8b5cf6" /> 
                  <span style={{ fontSize: '0.95rem' }}>Add Discounts</span>
                  <ChevronDown size={16} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '20px', cursor: 'pointer' }}>
                  <PlusSquare size={16} color="#8b5cf6" /> 
                  <span style={{ fontSize: '0.95rem' }}>Add Additional Charges</span>
                  <ChevronDown size={16} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                  <input type="checkbox" id="summarize-qty" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #cbd5e1', accentColor: '#8b5cf6' }} />
                  <label htmlFor="summarize-qty" style={{ fontSize: '0.95rem', cursor: 'pointer' }}>Summarise Total Quantity</label>
                </div>
              </div>

              {/* Total Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '2px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>
                  Total <span style={{ fontWeight: 'normal', color: '#475569', fontSize: '1.1rem' }}>(INR)</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>₹1.00</div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500 }}>
                  <Plus size={16} color="#8b5cf6" /> Add Custom Fields
                </button>
              </div>

              {/* Words Total Block */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>Show Total In Words</div>
                  <EyeOff size={18} color="#64748b" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>Total (in words)</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.95rem', borderBottom: '1px dashed #cbd5e1', paddingBottom: '4px', display: 'inline-block' }}>
                  One Rupee Only
                </div>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
             <button type="submit" style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer' }}>
               Next Step
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
