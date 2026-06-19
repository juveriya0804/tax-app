import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ amount: '', description: '', category: '' });

  useEffect(() => { loadExpenses(); }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetchApi('/expenses');
      setExpenses(res.data || []);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/expenses', {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(formData.amount),
          description: formData.description,
          category: formData.category
        })
      });
      toast.success('Expense logged');
      setFormData({ amount: '', description: '', category: '' });
      loadExpenses();
    } catch (err) {
      toast.error('Failed to save expense');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-gradient" style={{ marginBottom: '24px' }}>Purchases & Expenses</h1>

      <div className="glass-panel" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Log New Expense</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label className="form-label">Description</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label className="form-label">Category</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ margin: 0, width: '150px' }}>
            <label className="form-label">Amount</label>
            <input 
              type="number" 
              step="0.01" 
              className="form-input" 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '14px 24px' }}>Add</button>
        </form>
      </div>

      <div className="glass-panel">
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px' }}>{new Date(exp.date).toLocaleDateString()}</td>
                  <td style={{ padding: '12px' }}>{exp.description}</td>
                  <td style={{ padding: '12px' }}>{exp.category || '-'}</td>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--danger)' }}>
                    ${Number(exp.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No expenses logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
