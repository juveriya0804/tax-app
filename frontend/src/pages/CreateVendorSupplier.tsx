import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, ChevronUp, ChevronDown, Plus } from 'lucide-react';

export default function CreateVendorSupplier() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    country: 'India',
    city: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage for UI representation
    const payload = {
      id: Date.now().toString(),
      name: formData.businessName, // map businessName to name for the table
      company: formData.businessName,
      email: '',
      phone: '',
      ...formData
    };
    
    const existing = JSON.parse(localStorage.getItem('vendorsSuppliersExt') || '[]');
    localStorage.setItem('vendorsSuppliersExt', JSON.stringify([payload, ...existing]));

    toast.success('Vendor added successfully!');
    navigate('/vendors-suppliers');
  };

  return (
    <div style={{ padding: '0 0 40px 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/vendors-suppliers')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Add Vendor/Supplier</h1>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Basic Information</h2>
            <ChevronUp size={20} color="var(--text-primary)" />
          </div>
          
          <div style={{ 
            background: '#e2e8f0', 
            border: '1px dashed #94a3b8', 
            borderRadius: '8px', 
            padding: '40px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            cursor: 'pointer'
          }}>
            <Plus size={32} color="#475569" />
            <div style={{ fontWeight: 500, color: '#475569' }}>Upload Logo</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
              JPG or PNG, Dimensions 1080x1080px and file size up to 20MB
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">Vendor's Business Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Business Name (Required)"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Vendor Industry</label>
              <select 
                className="form-input"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              >
                <option value="">-Select an Industry-</option>
                <option value="Technology">Technology</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">Select Country <span style={{ color: '#ef4444' }}>*</span></label>
              <select 
                className="form-input" 
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label className="form-label">City/Town</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="City/Town Name"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

        </div>

        {/* Collapsed Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '32px' }}>
          {[
            { title: 'Tax Information', optional: true },
            { title: 'Address', optional: true },
            { title: 'Linked Contacts', badge: '0' },
            { title: 'Additional Details', optional: true },
            { title: 'Attachments', optional: true },
            { title: 'Bank Accounting Details', optional: true },
            { title: 'Account Details', optional: true },
          ].map((section, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '24px 0', 
                borderBottom: idx === 6 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {section.title}
                </span>
                {section.optional && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>(optional)</span>
                )}
                {section.badge && (
                  <span style={{ 
                    background: '#f1f5f9', 
                    color: '#64748b', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600 
                  }}>
                    {section.badge}
                  </span>
                )}
              </div>
              <ChevronDown size={20} color="var(--text-primary)" />
            </div>
          ))}
        </div>

        {/* Action Bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button 
            type="submit" 
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Save Vendor
          </button>
        </div>

      </form>
    </div>
  );
}
