import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Building2 } from 'lucide-react';

export default function CreateVendorLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'India',
    state: '',
    gstin: '',
    panNumber: '',
    nameAsPerPan: '',
    vendorType: 'Individual',
    city: '',
    pincode: '',
    street: '',
    subject: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage for instant UI reflection
    const payload = {
      id: Date.now().toString(),
      ...formData,
      workflowName: 'Vendor Onboarding',
      currentAssignee: 'Unassigned',
      currentStage: 'New',
      currentStatus: 'Active'
    };
    
    const existing = JSON.parse(localStorage.getItem('vendorLeads') || '[]');
    localStorage.setItem('vendorLeads', JSON.stringify([payload, ...existing]));

    toast.success('Vendor Lead added successfully!');
    navigate('/vendor-leads');
  };

  return (
    <div style={{ padding: '0 0 40px 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/vendor-leads')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Add Vendor Lead</h1>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Section 1: Lead Details */}
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px' }}>Lead Details</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Name <span style={{ color: 'red' }}>*</span></label>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Full name of the vendor</div>
            <input 
              type="text" 
              className="form-input" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">Phone</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="form-input" style={{ width: '100px' }}>
                  <option>🇮🇳 +91</option>
                </select>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">Country <span style={{ color: 'red' }}>*</span></label>
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
              <label className="form-label">State</label>
              <select 
                className="form-input"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">GSTIN</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Business GSTIN"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">PAN Number</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="PAN Number"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Name as Per PAN</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Name as Per PAN"
                value={formData.nameAsPerPan}
                onChange={(e) => setFormData({ ...formData, nameAsPerPan: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Vendor Type 
              <span style={{ cursor: 'pointer', border: '1px solid var(--text-secondary)', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>?</span>
            </label>
            <div style={{ display: 'flex', gap: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="vendorType" 
                  value="Individual" 
                  checked={formData.vendorType === 'Individual'}
                  onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
                  style={{ accentColor: '#8b5cf6' }}
                /> Individual
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="vendorType" 
                  value="Company" 
                  checked={formData.vendorType === 'Company'}
                  onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
                  style={{ accentColor: '#8b5cf6' }}
                /> Company
              </label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Street</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label className="form-label">Subject</label>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Brief 4-5 words on what they're looking for</div>
            <input 
              type="text" 
              className="form-input" 
              placeholder="E.g. Mobile App Development"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

        </div>

        {/* Section 3: Bank Account Details */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Bank Account Details <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-secondary)' }}>(Optional)</span>
          </h2>
          
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px dashed rgba(0,0,0,0.1)', 
            borderRadius: '12px', 
            padding: '40px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: '#f3e8ff', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#8b5cf6'
            }}>
              <Building2 size={24} />
            </div>
            
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Add Bank Account Details</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Record all payments received against this and future invoices in the respective Bank and other Payment Accounts.
            </div>
            
            <button 
              type="button"
              style={{ 
                background: '#8b5cf6', 
                color: 'white', 
                border: 'none', 
                padding: '10px 24px', 
                borderRadius: '6px', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>+</span> Add Bank Account
            </button>
          </div>
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
            Add Vendor Lead
          </button>
        </div>

      </form>
    </div>
  );
}
