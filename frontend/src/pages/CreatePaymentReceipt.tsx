import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreatePaymentReceipt() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    customerId: '',
    receiptNumber: `PR-${Date.now().toString().slice(-4)}`,
    paymentDate: new Date().toISOString().split('T')[0],
    amount: '',
    paymentMode: 'Bank Transfer',
    referenceNumber: '',
    notes: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadDependencies();
  }, [navigate]);

  const loadDependencies = async () => {
    try {
      const resC = await fetchApi('/billing/customers').catch(() => ({ data: [] }));
      setCustomers(resC.data || []);
    } catch (e) {
      console.error('Failed to load dependencies', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('paymentReceipts') || '[]');
      const customerName = customers.find(c => c.id === formData.customerId)?.name || 'Walk-in Customer';
      const newReceipt = { 
        id: Date.now().toString(),
        customerName,
        ...formData
      };
      localStorage.setItem('paymentReceipts', JSON.stringify([newReceipt, ...existing]));

      toast.success('Payment receipt created successfully!');
      navigate('/payment-receipts');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create payment receipt');
    }
  };

  return (
    <div style={{ padding: '0 0 20px 0', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/payment-receipts')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Create Payment Receipt</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label className="form-label">Customer</label>
            <select 
              className="form-input" 
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              required
            >
              <option value="">Select a Customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label">Receipt Number</label>
            <input 
              type="text" 
              className="form-input" 
              required
              value={formData.receiptNumber}
              onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label className="form-label">Payment Date</label>
            <input 
              type="date" 
              className="form-input" 
              required
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Amount Received (₹)</label>
            <input 
              type="number" 
              className="form-input" 
              required
              min="0"
              step="any"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label className="form-label">Payment Mode</label>
            <select 
              className="form-input" 
              value={formData.paymentMode}
              onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div>
            <label className="form-label">Reference Number / UTR</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. TXN123456789"
              value={formData.referenceNumber}
              onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label className="form-label">Notes (Optional)</label>
          <textarea 
            className="form-input" 
            rows={3}
            placeholder="Add any internal notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              gap: '8px',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}
          >
            <Save size={18} /> Save Receipt
          </button>
        </div>

      </form>
    </div>
  );
}
