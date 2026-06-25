import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, ChevronUp, Plus, Edit2, Save } from 'lucide-react';

export default function ViewVendorSupplier() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    country: 'India',
    city: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadVendor();
  }, [id, navigate]);

  const loadVendor = () => {
    const existing = JSON.parse(localStorage.getItem('vendorsSuppliersExt') || '[]');
    const found = existing.find((v: any) => v.id === id);
    if (found) {
      setFormData({
        businessName: found.businessName || found.name || '',
        industry: found.industry || '',
        country: found.country || 'India',
        city: found.city || ''
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existing = JSON.parse(localStorage.getItem('vendorsSuppliersExt') || '[]');
    const updated = existing.map((v: any) => {
      if (v.id === id) {
        return {
          ...v,
          ...formData,
          name: formData.businessName,
          company: formData.businessName
        };
      }
      return v;
    });

    localStorage.setItem('vendorsSuppliersExt', JSON.stringify(updated));
    toast.success('Vendor updated successfully!');
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '0 0 40px 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/vendors-suppliers')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
            {formData.businessName || 'Vendor Details'}
          </h1>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Edit2 size={18} /> Edit Vendor
          </button>
        )}
      </div>

      <form onSubmit={handleSave}>
        
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
            cursor: isEditing ? 'pointer' : 'default',
            opacity: isEditing ? 1 : 0.7
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
                disabled={!isEditing}
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Vendor Industry</label>
              <select 
                className="form-input"
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

        </div>

        {isEditing && (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={20} /> Save Changes
            </button>
            <button 
              type="button"
              onClick={() => {
                setIsEditing(false);
                loadVendor();
              }}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
