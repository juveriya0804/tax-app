import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Trash2, Save, Eye, EyeOff, Tag, PlusSquare, ChevronDown } from 'lucide-react';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [items, setItems] = useState<any[]>([{ productId: '', description: '', quantity: 1, unitPrice: 0 }]);

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
      
      const resP = await fetchApi('/inventory/products').catch(() => ({ data: [] }));
      setProducts(resP.data || []);
    } catch (e) {
      console.error('Failed to load dependencies', e);
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: '', description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amount = calculateTotal();
      const payload = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
        amount: amount,
        vatAmount: 0,
        totalAmount: amount,
        items: items.map(item => ({
          productId: item.productId || undefined,
          description: item.description || 'Custom Item',
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice)
        }))
      };

      await fetchApi('/billing/invoices', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      toast.success('Invoice created successfully!');
      navigate('/invoices');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create invoice');
    }
  };

  return (
    <div style={{ padding: '0 0 20px 0', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/invoices')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Create Invoice</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Header Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          <div>
            <label className="form-label">Customer</label>
            <select 
              className="form-input" 
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            >
              <option value="">Select a Customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name} {c.email ? `(${c.email})` : ''}</option>)}
              <option value="walkin">Walk-in Customer</option>
            </select>
          </div>

          <div>
            <label className="form-label">Invoice Number</label>
            <input 
              type="text" 
              className="form-input" 
              required
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Due Date</label>
            <input 
              type="date" 
              className="form-input" 
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
        </div>

        {/* Line Items */}
        <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Line Items</h3>
        <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)' }}>Item Description</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)', width: '120px' }}>Quantity</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-secondary)', width: '150px' }}>Unit Price (₹)</th>
                <th style={{ padding: '12px 16px', width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="E.g., Web Design Services" 
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="1" 
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input 
                      type="number" 
                      className="form-input" 
                      min="0" 
                      step="any" 
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button 
                      type="button" 
                      onClick={() => removeItem(index)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.01)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <button 
              type="button" 
              onClick={addItem}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={16} /> Add Another Item
            </button>
          </div>
        </div>

        {/* Totals Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', marginTop: '32px' }}>
          <div></div>
          <div style={{ background: 'rgba(248, 249, 250, 0.5)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontWeight: 600, color: '#334155' }}>
              <span>Show Total in PDF</span>
              <Eye size={18} color="var(--text-secondary)" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <span>Amount</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{calculateTotal().toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <span>SGST</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹0.00</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-secondary)' }}>
              <span>CGST</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹0.00</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', marginBottom: '16px', cursor: 'pointer' }}>
              <Tag size={16} /> Add Discounts <ChevronDown size={14} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', marginBottom: '20px', cursor: 'pointer' }}>
              <PlusSquare size={16} /> Add Additional Charges <ChevronDown size={14} />
            </div>

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '24px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Total <span style={{ fontSize: '1rem', fontWeight: 400 }}>(INR)</span></span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
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
            <Save size={18} /> Save Invoice
          </button>
        </div>

      </form>
    </div>
  );
}
