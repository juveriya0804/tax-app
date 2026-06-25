import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken } from '../services/api';
import { ArrowLeft, Printer, Download, Edit, Settings, Palette, Landmark, CheckCircle, History, Link as LinkIcon, ChevronDown, ChevronUp, FileText, Package, Pencil, Share2, QrCode, ExternalLink } from 'lucide-react';

export default function ViewQuotation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState<any>(null);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(true);
  const [customizeDesignOpen, setCustomizeDesignOpen] = useState(false);
  const [bankDetailsOpen, setBankDetailsOpen] = useState(false);
  const [acceptanceHistoryOpen, setAcceptanceHistoryOpen] = useState(false);
  const [approvalHistoryOpen, setApprovalHistoryOpen] = useState(false);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadQuotation();
  }, [id, navigate]);

  const loadQuotation = async () => {
    try {
      const res = await fetchApi(`/quotations/${id}`);
      setQuotation(res);
    } catch (e) {
      console.error(e);
    }
  };

  if (!quotation) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Quotation Details...</div>;
  }

  return (
    <div style={{ padding: '0 0 40px 0', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Top Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/quotations')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} style={{ marginRight: '8px' }} /> Back to Quotations
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => window.print()}>
            <Printer size={16} /> Print
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={16} /> Download PDF
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit size={16} /> Edit
          </button>
        </div>
      </div>

      {/* Quotation Document */}
      <div className="glass-panel" style={{ padding: '48px', background: 'white', color: '#333' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f3f4f6', paddingBottom: '32px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', color: '#111827' }}>QUOTATION</h1>
            <div style={{ fontSize: '1.1rem', color: '#6b7280' }}>#{quotation.quotationNumber}</div>
            <div style={{ marginTop: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '12px', 
                fontSize: '0.85rem', 
                background: quotation.status === 'DRAFT' ? '#f3f4f6' : '#ecfdf5',
                color: quotation.status === 'DRAFT' ? '#374151' : '#059669',
                fontWeight: 600
              }}>
                {quotation.status}
              </span>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>Your Company Name</h3>
            <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
              123 Business Avenue, Suite 100<br/>
              City, State, ZIP<br/>
              contact@yourcompany.com
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h4 style={{ color: '#6b7280', margin: '0 0 8px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quotation To:</h4>
            <h3 style={{ margin: '0 0 4px 0', color: '#111827', fontSize: '1.2rem' }}>{quotation.customer?.name || 'Walk-in Customer'}</h3>
            {quotation.customer?.email && <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>{quotation.customer.email}</p>}
            {quotation.customer?.phone && <p style={{ margin: '0', color: '#6b7280', fontSize: '0.9rem' }}>{quotation.customer.phone}</p>}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '16px' }}>Issue Date:</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>{new Date(quotation.issueDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '16px' }}>Valid Until:</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>{quotation.validUntil ? new Date(quotation.validUntil).toLocaleDateString() : '-'}</span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#374151', fontWeight: 600 }}>Description</th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#374151', fontWeight: 600, width: '100px' }}>Qty</th>
              <th style={{ padding: '12px 8px', textAlign: 'right', color: '#374151', fontWeight: 600, width: '150px' }}>Unit Price</th>
              <th style={{ padding: '12px 8px', textAlign: 'right', color: '#374151', fontWeight: 600, width: '150px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {quotation.items?.map((item: any) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px 8px', color: '#111827' }}>{item.description}</td>
                <td style={{ padding: '16px 8px', textAlign: 'center', color: '#4b5563' }}>{item.quantity}</td>
                <td style={{ padding: '16px 8px', textAlign: 'right', color: '#4b5563' }}>₹{parseFloat(item.unitPrice).toFixed(2)}</td>
                <td style={{ padding: '16px 8px', textAlign: 'right', color: '#111827', fontWeight: 500 }}>
                  ₹{(item.quantity * parseFloat(item.unitPrice)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 8px', borderBottom: '1px solid #f3f4f6', color: '#4b5563' }}>
              <span>Subtotal</span>
              <span>₹{parseFloat(quotation.amount).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 8px', borderBottom: '1px solid #f3f4f6', color: '#4b5563' }}>
              <span>Tax (VAT)</span>
              <span>₹{parseFloat(quotation.vatAmount).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 8px', marginTop: '8px', background: '#f9fafb', borderRadius: '8px', color: '#111827', fontWeight: 700, fontSize: '1.2rem' }}>
              <span>Total</span>
              <span>₹{parseFloat(quotation.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', color: '#6b7280', fontSize: '0.9rem' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Terms & Conditions</h4>
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            1. Quotation is valid until the specified "Valid Until" date.<br/>
            2. Full payment is required upon acceptance unless otherwise agreed.<br/>
            3. Subject to standard terms of service.
          </p>
        </div>

      </div>

      {/* Advanced Modules Section */}
      <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '1px', background: '#e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Module 1 (Expanded) */}
        <div style={{ background: 'white' }}>
          <div 
            onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
            style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: advancedSettingsOpen ? '1px solid #f3f4f6' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
              <Settings size={20} color="#6b7280" /> Advanced Settings
            </div>
            {advancedSettingsOpen ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
          </div>
          
          {advancedSettingsOpen && (
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>HSN column view</span>
              <select className="form-input" style={{ width: '300px', background: 'white', borderColor: '#e5e7eb' }}>
                <option>Default</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Unit</span>
              <select className="form-input" style={{ width: '300px', background: 'white', borderColor: '#e5e7eb' }}>
                <option>Select...</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Tax Summary</span>
              <select className="form-input" style={{ width: '300px', background: 'white', borderColor: '#e5e7eb' }}>
                <option>Do not show</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Place/Country Of Supply</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Description In Full Width</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show SKU in Quotation</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Serial Numbers in Quotation</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Subtotal For Group Items</span>
              <div style={{ width: '40px', height: '24px', background: '#8b5cf6', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Summarized Total Quantity</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Totals</span>
              <div style={{ width: '40px', height: '24px', background: '#8b5cf6', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4b5563', fontSize: '0.95rem' }}>Show Total in Words</span>
              <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
            
          </div>
          )}
        </div>

        {/* Module 2 (Expanded) */}
        <div style={{ background: 'white' }}>
          <div 
            onClick={() => setCustomizeDesignOpen(!customizeDesignOpen)}
            style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderTop: '1px solid #f3f4f6', borderBottom: customizeDesignOpen ? '1px solid #f3f4f6' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
              <Palette size={20} color="#6b7280" /> Customize Quotation Design
            </div>
            {customizeDesignOpen ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
          </div>

          {customizeDesignOpen && (
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', background: '#fafafa' }}>
              
              {/* 1. Select Template */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>1. Select Template</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                
                <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px' }}>
                  {/* Template 1 */}
                  <div style={{ flex: '0 0 300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 500, color: '#374151' }}>Professional</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b5cf6', fontSize: '0.9rem', fontWeight: 500 }}>
                        <div style={{ background: '#8b5cf6', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={12} /></div> Selected
                      </span>
                    </div>
                    <div style={{ height: '350px', background: '#f3f4f6', borderRadius: '8px', border: '2px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>Preview Image</div>
                  </div>
                  
                  {/* Template 2 */}
                  <div style={{ flex: '0 0 300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 500, color: '#374151' }}>Modern <span style={{ color: '#ec4899', fontSize: '0.8rem', marginLeft: '4px' }}>New</span></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '0.9rem' }}>
                        <div style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '50%', width: '16px', height: '16px' }}></div> Select
                      </span>
                    </div>
                    <div style={{ height: '350px', background: '#f3f4f6', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>Preview Image</div>
                  </div>

                  {/* Template 3 */}
                  <div style={{ flex: '0 0 300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 500, color: '#374151' }}>Simple <span style={{ color: '#ec4899', fontSize: '0.8rem', marginLeft: '4px' }}>New</span></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '0.9rem' }}>
                        <div style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '50%', width: '16px', height: '16px' }}></div> Select
                      </span>
                    </div>
                    <div style={{ height: '350px', background: '#f3f4f6', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>Preview Image</div>
                  </div>
                </div>
              </div>

              {/* 2. Change Color & Font */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>2. Change Color & Font</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: '#4b5563' }}>Invoice Color</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#06b6d4', cursor: 'pointer' }}></div>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#3b82f6', cursor: 'pointer' }}></div>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#f97316', cursor: 'pointer' }}></div>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#ef4444', cursor: 'pointer' }}></div>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', background: '#8b5cf6', cursor: 'pointer' }}></div>
                      <div style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>🌈</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden', width: '150px' }}>
                      <div style={{ padding: '8px', background: '#f3f4f6', borderRight: '1px solid #e5e7eb', color: '#6b7280' }}>#</div>
                      <input type="text" value="313944" style={{ padding: '8px', border: 'none', outline: 'none', width: '100%' }} readOnly />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: '#4b5563' }}>Heading Font</label>
                    <select className="form-input" style={{ width: '100%' }}><option>Open Sans</option></select>
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: '#4b5563' }}>Body Font</label>
                    <select className="form-input" style={{ width: '100%' }}><option>Open Sans</option></select>
                  </div>
                </div>
              </div>

              {/* 3. Add LetterHead & Footer */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>3. Add LetterHead & Footer</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500, color: '#374151' }}>Letterhead</label>
                    <div style={{ border: '1px dashed #d1d5db', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', background: '#f9fafb', marginBottom: '16px', cursor: 'pointer' }}>
                      <div style={{ fontSize: '24px', color: '#6b7280', marginBottom: '8px' }}>+</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Recommended resolution 1000x200px and file size upto 500KB</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                      <span style={{ color: '#4b5563' }}>Show only on First Page</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Header will be applied at the top of first page</div>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500, color: '#374151' }}>Footer</label>
                    <div style={{ border: '1px dashed #d1d5db', borderRadius: '8px', padding: '40px 20px', textAlign: 'center', background: '#f9fafb', marginBottom: '16px', cursor: 'pointer' }}>
                      <div style={{ fontSize: '24px', color: '#6b7280', marginBottom: '8px' }}>+</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Recommended resolution 1000x200px and file size upto 500KB</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                      <span style={{ color: '#4b5563' }}>Show only on Last Page</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Footer will be applied at the end of the content on the last page</div>
                  </div>
                </div>
              </div>

              {/* 4. Page Size, Margins & More */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>4. Page Size, Margins & More</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Paper Size</label>
                    <select className="form-input" style={{ width: '100%' }}><option>A4</option></select>
                  </div>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Page Margin</label>
                    <select className="form-input" style={{ width: '100%' }}><option>Narrow</option></select>
                  </div>
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Text Scale</label>
                    <select className="form-input" style={{ width: '100%' }}><option>Smaller</option></select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '0.9rem' }}><input type="checkbox" /> Hide Footer</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '0.9rem' }}><input type="checkbox" /> Landscape</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '0.9rem' }}><input type="checkbox" /> Pageless PDF</label>
                  </div>
                </div>
              </div>

              {/* 5. Watermark */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>5. Watermark</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '24px', background: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                  </div>
                  <span style={{ color: '#4b5563' }}>Enable Watermark</span>
                </div>
                <button className="btn-primary" style={{ background: '#8b5cf6', border: 'none', padding: '10px 24px', color: 'white', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>Apply Changes</button>
              </div>

              {/* 6. Change Script */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>6. Change Script</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0 0 24px 0' }}>Select a supported script if you're using a non-english language and keyboard for your documents</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                  <div style={{ width: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Language/Script</label>
                    <select className="form-input" style={{ width: '100%' }}><option>English (Latin)</option></select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                    <span style={{ color: '#4b5563' }}>Enable right-to-left script</span>
                  </div>
                </div>
              </div>

              {/* 7. Other Configurations */}
              <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>7. Other Configurations</h3>
                  <ChevronUp size={20} color="#9ca3af" />
                </div>
                
                <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '400px' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
                    <div>
                      <div style={{ color: '#4b5563', fontWeight: 500, marginBottom: '4px' }}>Optimise text wrapping</div>
                      <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Intelligently break long text at natural word boundaries</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '400px' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
                    <div>
                      <div style={{ color: '#4b5563', fontWeight: 500, marginBottom: '4px' }}>Use Original Logo Image</div>
                      <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Select to use the original logo image for better quality. Will increase the PDF size.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Module 3 (Expanded) */}
        <div style={{ background: 'white' }}>
          <div 
            onClick={() => setBankDetailsOpen(!bankDetailsOpen)}
            style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderTop: '1px solid #f3f4f6', borderBottom: bankDetailsOpen ? '1px solid #f3f4f6' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
              <Landmark size={20} color="#6b7280" /> Bank And UPI Details
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px', marginLeft: '8px' }}>
                <CheckCircle size={12} /> Enabled
              </span>
            </div>
            {bankDetailsOpen ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
          </div>

          {bankDetailsOpen && (
            <div style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap', background: '#fafafa' }}>
              
              {/* Left Column: Bank Account Details */}
              <div style={{ flex: 1, minWidth: '350px', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                      <Landmark size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: '#374151' }}>Show Bank Account Details</div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>NEFT, IMPS, CASH</div>
                    </div>
                  </div>
                  <div style={{ width: '40px', height: '24px', background: '#8b5cf6', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '8px', padding: '20px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>Bank Account</span>
                    <button style={{ background: 'transparent', border: 'none', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                  <div style={{ fontWeight: 500, color: '#374151', marginBottom: '16px' }}>NAFTER</div>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', color: '#4b5563', marginBottom: '12px' }}>
                    <div><span style={{ fontWeight: 600 }}>Bank:</span> HDFC BANK</div>
                    <div><span style={{ fontWeight: 600 }}>Acc. No:</span> 50200088871089</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                    <span style={{ fontWeight: 600 }}>IFSC:</span> HDFC0000694
                  </div>
                </div>

                <button style={{ width: '100%', background: 'white', border: '1px solid #e5e7eb', padding: '12px', borderRadius: '8px', color: '#374151', fontWeight: 500, cursor: 'pointer' }}>
                  Select Another Bank Account
                </button>
              </div>

              {/* Right Column: UPI Details */}
              <div style={{ flex: 1, minWidth: '350px', background: '#f8fafc', padding: '40px 24px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '16px' }}>
                  <QrCode size={24} />
                </div>
                <div style={{ fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Add UPI Details</div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0 0 24px 0', maxWidth: '300px' }}>
                  Collect payments via UPI apps such as Google Pay, PhonePe, and PayTM.
                </p>
                <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span> Add UPI ID
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Module 4 (Expanded) */}
        <div style={{ background: 'white' }}>
          <div 
            onClick={() => setAcceptanceHistoryOpen(!acceptanceHistoryOpen)}
            style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderTop: '1px solid #f3f4f6', borderBottom: acceptanceHistoryOpen ? '1px solid #f3f4f6' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
              <CheckCircle size={20} color="#6b7280" /> Acceptance History
            </div>
            {acceptanceHistoryOpen ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
          </div>

          {acceptanceHistoryOpen && (
            <div style={{ padding: '40px 24px', position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              {/* Blurred Background Table */}
              <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', bottom: '24px', filter: 'blur(4px)', opacity: 0.4, pointerEvents: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb', marginBottom: '16px' }}>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '120px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '80px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '90px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '70px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '110px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '90px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '110px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '120px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '80px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Foreground Content */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', background: 'rgba(255,255,255,0.7)', padding: '24px', borderRadius: '12px' }}>
                <div style={{ width: '48px', height: '56px', background: '#8b5cf6', borderRadius: '8px', color: 'white', display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 10px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }}>
                  <div style={{ width: '100%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                  <div style={{ width: '100%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                  <div style={{ width: '70%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                </div>
                
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                  Enable your clients or vendors to formally accept documents, adding an extra layer of confirmation to your business transactions.
                </p>
                
                <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <ExternalLink size={16} /> Enable 1-Click Document Acceptance
                </button>
              </div>

            </div>
          )}
        </div>



        {/* Module 6 */}
        <div style={{ background: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
            <LinkIcon size={20} color="#6b7280" /> Linked Documents
          </div>
          <ChevronDown size={20} color="#9ca3af" />
        </div>

        {/* Module 7 */}
        <div style={{ background: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
            <LinkIcon size={20} color="#6b7280" /> Linked Lead
          </div>
          <ChevronDown size={20} color="#9ca3af" />
        </div>

        {/* Module 8 (Expanded) */}
        <div style={{ background: 'white' }}>
          <div 
            onClick={() => setApprovalHistoryOpen(!approvalHistoryOpen)}
            style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderTop: '1px solid #f3f4f6', borderBottom: approvalHistoryOpen ? '1px solid #f3f4f6' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
              <FileText size={20} color="#6b7280" /> View Approval History
            </div>
            {approvalHistoryOpen ? <ChevronUp size={20} color="#9ca3af" /> : <ChevronDown size={20} color="#9ca3af" />}
          </div>

          {approvalHistoryOpen && (
            <div style={{ padding: '40px 24px', position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              {/* Blurred Background Table */}
              <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', bottom: '24px', filter: 'blur(4px)', opacity: 0.4, pointerEvents: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb', marginBottom: '16px' }}>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#d1d5db', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '120px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '80px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '90px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '70px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '110px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '90px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '110px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '100px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '120px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  <div style={{ width: '80px', height: '16px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Foreground Content */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', background: 'rgba(255,255,255,0.7)', padding: '24px', borderRadius: '12px' }}>
                <div style={{ width: '48px', height: '56px', background: '#8b5cf6', borderRadius: '8px', color: 'white', display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 10px', marginBottom: '24px', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }}>
                  <div style={{ width: '100%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                  <div style={{ width: '100%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                  <div style={{ width: '70%', height: '3px', background: 'white', borderRadius: '2px' }}></div>
                </div>
                
                <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                  Add this Quotation to a Workflow to initiate Approvals
                </p>
                
                <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  Send for Approval
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Module 9 */}
        <div style={{ background: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', fontWeight: 500 }}>
            <Package size={20} color="#6b7280" /> Batch Summary
          </div>
          <ChevronDown size={20} color="#9ca3af" />
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div style={{ marginTop: '40px', padding: '16px', background: '#fafafa', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px' }}>
        
        {/* Left Side (Edit) */}
        <div>
          <button style={{ 
            background: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            padding: '8px 12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            color: '#4b5563',
            fontSize: '0.8rem',
            cursor: 'pointer',
            minWidth: '60px'
          }}>
            <Pencil size={18} color="#6b7280" />
            Edit
          </button>
        </div>

        {/* Right Side Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            background: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            padding: '8px 12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            color: '#4b5563',
            fontSize: '0.8rem',
            cursor: 'pointer',
            minWidth: '70px'
          }} onClick={() => window.print()}>
            <Printer size={18} color="#6b7280" />
            Print
          </button>

          <button style={{ 
            background: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px', 
            padding: '8px 12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            color: '#4b5563',
            fontSize: '0.8rem',
            cursor: 'pointer',
            minWidth: '80px'
          }}>
            <Download size={18} color="#6b7280" />
            Download
          </button>

          <button style={{ 
            background: 'white', 
            border: '1px solid #a855f7', 
            borderRadius: '6px', 
            padding: '8px 16px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            color: '#a855f7',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 500,
            minWidth: '100px'
          }}>
            <Share2 size={18} color="#a855f7" />
            Email / WhatsApp
          </button>

          <button style={{ 
            background: 'white', 
            border: '1px solid #a855f7', 
            borderRadius: '6px', 
            padding: '8px 12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            color: '#a855f7',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 500,
            minWidth: '60px'
          }}>
            <ChevronDown size={18} color="#a855f7" />
            More
          </button>
        </div>
      </div>

    </div>
  );
}
