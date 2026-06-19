import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchApi } from '../services/api';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  vendor?: any;
}

export default function VendorModal({ isOpen, onClose, onSaved, vendor }: VendorModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || '',
        company: vendor.company || '',
        email: vendor.email || '',
        phone: vendor.phone || ''
      });
    } else {
      setFormData({ name: '', company: '', email: '', phone: '' });
    }
  }, [vendor]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (vendor) {
        await fetchApi(`/vendors/${vendor.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await fetchApi('/vendors', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save vendor');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{
        width: '100%', maxWidth: '500px', padding: '32px', position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '24px', color: '#0f172a' }}>{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Vendor Name *</label>
            <input name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input name="company" className="form-input" value={formData.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, color: 'white', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : 'Save Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
