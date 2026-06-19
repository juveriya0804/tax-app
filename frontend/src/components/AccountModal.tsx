import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchApi } from '../services/api';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  account?: any;
  accounts: any[];
}

const accountTypes = [
  { value: 'ASSET', label: 'Asset' },
  { value: 'LIABILITY', label: 'Liability' },
  { value: 'EQUITY', label: 'Equity' },
  { value: 'REVENUE', label: 'Revenue' },
  { value: 'EXPENSE', label: 'Expense' }
];

export default function AccountModal({ isOpen, onClose, onSaved, account, accounts }: AccountModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'ASSET',
    description: '',
    parentAccountId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (account) {
      setFormData({
        code: account.code || '',
        name: account.name || '',
        type: account.type || 'ASSET',
        description: account.description || '',
        parentAccountId: account.parentAccountId || ''
      });
    } else {
      setFormData({ code: '', name: '', type: 'ASSET', description: '', parentAccountId: '' });
    }
  }, [account]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        parentAccountId: formData.parentAccountId || null
      };

      if (account) {
        await fetchApi(`/accounting/accounts/${account.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await fetchApi('/accounting/accounts', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save account');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        <h2 style={{ marginBottom: '24px', color: '#0f172a' }}>{account ? 'Edit Account' : 'Add New Account'}</h2>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Account Code *</label>
              <input name="code" className="form-input" value={formData.code} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label">Account Name *</label>
              <input name="name" className="form-input" value={formData.name} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Account Type *</label>
            <select name="type" className="form-input" value={formData.type} onChange={handleChange} required>
              {accountTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Parent Account (Optional)</label>
            <select name="parentAccountId" className="form-input" value={formData.parentAccountId} onChange={handleChange}>
              <option value="">-- None --</option>
              {accounts.filter(a => a.id !== account?.id).map(a => (
                <option key={a.id} value={a.id}>{a.code} - {a.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input name="description" className="form-input" value={formData.description} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600, color: 'white', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : 'Save Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
