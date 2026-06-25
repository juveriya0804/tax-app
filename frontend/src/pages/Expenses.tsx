import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, CloudUpload, Home, Users, CreditCard, Sparkles } from 'lucide-react';

export default function Expenses() {
  const navigate = useNavigate();
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

  if (!loading && expenses.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '700px', margin: '40px auto', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1f2937', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          Purchases and Expenses
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px' }}>
          Create, Manage, Track & Optimize Your Purchases and Expenses Instantly. Get Essential Puchase and Expense Reports within seconds
        </p>

        {/* Illustration Area */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '320px', 
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', 
          borderRadius: '24px', 
          marginBottom: '40px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'
        }}>
          {/* Abstract background lines */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="black" strokeWidth="0.5" />
            <path d="M0 70 Q 25 50, 50 70 T 100 70" fill="none" stroke="black" strokeWidth="0.5" />
            <path d="M0 30 Q 25 10, 50 30 T 100 30" fill="none" stroke="black" strokeWidth="0.5" />
          </svg>
          
          {/* Main Document Card */}
          <div style={{ 
            width: '200px', 
            height: '260px', 
            background: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '40%', height: '6px', background: '#cbd5e1', borderRadius: '4px' }}></div>
              <div style={{ width: '70%', height: '6px', background: '#cbd5e1', borderRadius: '4px' }}></div>
              <div style={{ width: '60%', height: '6px', background: '#cbd5e1', borderRadius: '4px' }}></div>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#8b5cf6', borderRadius: '3px', margin: '4px 0' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}></div>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '70%', height: '6px', background: '#cbd5e1', borderRadius: '4px' }}></div>
                <div style={{ width: '40%', height: '6px', background: '#cbd5e1', borderRadius: '4px' }}></div>
            </div>

            {/* Purple Dollar Badge */}
            <div style={{ 
              position: 'absolute', 
              bottom: '24px', 
              right: '-16px', 
              background: '#8b5cf6', 
              color: 'white', 
              padding: '6px 12px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 4px 10px rgba(139, 92, 246, 0.4)'
            }}>
              $
            </div>
          </div>

          {/* Floating Icons */}
          <div style={{ position: 'absolute', top: '35%', left: '15%', background: 'white', padding: '12px', borderRadius: '50%', boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)' }}>
            <Home size={28} color="#0ea5e9" />
          </div>
          <div style={{ position: 'absolute', bottom: '15%', left: '20%', background: 'white', padding: '16px', borderRadius: '50%', boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)', transform: 'rotate(-10deg)' }}>
            <CreditCard size={32} color="#84cc16" />
          </div>
          <div style={{ position: 'absolute', top: '15%', right: '28%', background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)' }}>
            <Sparkles size={20} color="#eab308" />
          </div>
          <div style={{ position: 'absolute', bottom: '25%', right: '15%', background: 'white', padding: '14px', borderRadius: '50%', boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)' }}>
            <Users size={28} color="#ef4444" />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '420px' }}>
          <button 
            onClick={() => navigate('/purchases/create')}
            style={{ 
              background: '#8b5cf6', 
              color: 'white', 
              border: 'none', 
              padding: '18px', 
              borderRadius: '12px', 
              fontSize: '18px', 
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              transition: 'transform 0.2s, boxShadow 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Create First Purchase
          </button>
          <button 
            onClick={() => document.getElementById('expense-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ 
              background: 'transparent', 
              color: '#8b5cf6', 
              border: 'none', 
              padding: '16px', 
              fontSize: '18px', 
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Create New Expenditure
          </button>
          <button style={{ 
            background: 'transparent', 
            color: '#8b5cf6', 
            border: 'none', 
            padding: '16px', 
            fontSize: '18px', 
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <CloudUpload size={24} /> Upload Purchases
          </button>
        </div>
        
        {/* Hidden Form for triggering via button if needed */}
        <div id="expense-form" style={{ marginTop: '40px', width: '100%', opacity: 0.5 }}>
           <p style={{ color: '#9ca3af' }}>Or log a simple expense below...</p>
           {/* Form could be un-hidden here, but to keep it clean, maybe just navigate to a new expense page instead or show a modal */}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="text-gradient" style={{ margin: 0 }}>Purchases & Expenses</h1>
        <button 
          onClick={() => navigate('/purchases/create')}
          style={{ 
            background: '#e11d48', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '6px', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Create New Purchase
        </button>
      </div>

      <div className="glass-panel" style={{ marginBottom: '32px' }} id="expense-form">
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
