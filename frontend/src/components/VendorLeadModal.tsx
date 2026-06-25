import React, { useState } from 'react';
import { X } from 'lucide-react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

interface VendorLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (lead: any) => void;
}

export default function VendorLeadModal({ isOpen, onClose, onSaved }: VendorLeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetchApi('/vendors/vendor-leads', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          workflowName: 'Vendor Onboarding',
          currentAssignee: 'Unassigned',
          currentStage: 'New',
          currentStatus: 'Active'
        }),
      });
      
      toast.success('Vendor Lead added successfully!');
      onSaved(res.data);
      setFormData({ name: '', phone: '', email: '', country: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to save vendor lead');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        position: 'relative',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>
          Add Vendor Lead Manually
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="form-label">Name *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Acme Supplies"
            />
          </div>

          <div>
            <label className="form-label">Phone *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +1 234 567 8900"
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. contact@example.com"
            />
          </div>

          <div>
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-input"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g. United States"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary"
              style={{ flex: 1, background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 2 }}
            >
              Save Vendor Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
