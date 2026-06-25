import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (customer: any) => void;
  customer?: any;
}

export default function CustomerModal({ isOpen, onClose, onSaved, customer }: CustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        email: customer.email || '',
      });
    } else {
      setFormData({ name: '', phone: '', email: '' });
    }
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let savedCustomer;
      if (customer?.id) {
        await fetchApi(`/billing/customers/${customer.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        savedCustomer = { ...customer, ...formData };
        toast.success('Customer updated successfully');
      } else {
        const res = await fetchApi('/billing/customers', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        savedCustomer = res.data;
        toast.success('Customer created successfully');
      }
      onSaved(savedCustomer);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save customer');
    } finally {
      setLoading(false);
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
          {customer ? 'Edit Customer' : 'Add New Customer'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="form-label">Customer Name *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Acme Corp or John Doe"
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
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
