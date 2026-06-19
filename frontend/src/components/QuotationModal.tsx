import { useState } from 'react';
import { fetchApi } from '../services/api';

interface QuotationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function QuotationModal({ onClose, onSuccess }: QuotationModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, we'd capture form data here. Using dummy data for now.
      await fetchApi('/quotations', {
        method: 'POST',
        body: JSON.stringify({
          quotationNumber: `QT-${Date.now()}`,
          amount: 1000,
          vatAmount: 50,
          totalAmount: 1050,
          status: 'DRAFT',
          items: [
            { description: 'Service 1', quantity: 1, unitPrice: 1000 }
          ]
        })
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '500px', padding: '30px', background: 'white' }}>
        <h2 style={{ marginBottom: '20px' }}>Create Quotation</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Customer Name</label>
            <input type="text" className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="Enter customer name..." required />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Total Amount</label>
            <input type="number" className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} placeholder="0.00" required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              {loading ? 'Creating...' : 'Create Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
