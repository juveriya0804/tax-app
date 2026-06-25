import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { Plus, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '24px' }}>
      {/* Header Area */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '48px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Imran" 
            alt="Profile" 
            style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e5e7eb' }}
          />
          <div>
            <div style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '4px' }}>Hello admin</div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#111827', margin: 0 }}>
              Welcome back to Taxflow Admin!
            </h1>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/quotations/create')}
          style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#e11d48',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: '600',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(225, 29, 72, 0.39)',
          fontSize: '0.95rem'
        }}>
          <Plus size={18} />
          Create Quotation
          <ChevronDown size={18} style={{ marginLeft: '4px' }} />
        </button>
      </div>

      {/* Getting Started Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '24px' }}>
        Getting Started
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {/* Invoice Card */}
        <div className="refrens-card">
          <div className="refrens-card-title">Your Last Invoice</div>
          
          <div className="refrens-card-label">Invoice No.</div>
          <div className="refrens-card-value">May-25-15</div>
          
          <div className="refrens-card-label">Billed To</div>
          <div className="refrens-card-value">Vision Fab Private Limited</div>
          
          <div className="refrens-card-label">Amount</div>
          <div className="refrens-card-value">₹1,77,000</div>
          
          <div className="refrens-card-label">Invoice Date</div>
          <div className="refrens-card-value" style={{ marginBottom: 0 }}>08 Jun 2026</div>
        </div>

        {/* Quotation Card */}
        <div className="refrens-card">
          <div className="refrens-card-title">Your Last Quotation</div>
          
          <div className="refrens-card-label">Quotation No.</div>
          <div className="refrens-card-value">NA223</div>
          
          <div className="refrens-card-label">Quotation For</div>
          <div className="refrens-card-value">Vision Fab Private Limited</div>
          
          <div className="refrens-card-label">Amount</div>
          <div className="refrens-card-value">₹5,90,000</div>
          
          <div className="refrens-card-label">Quotation Date</div>
          <div className="refrens-card-value" style={{ marginBottom: 0 }}>27 Mar 2026</div>
        </div>

        {/* Expenses Card */}
        <div className="refrens-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="refrens-card-title">Expenses</div>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
            Stay on top of your expenses. Track and manage your finances with ease and accuracy.
          </p>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <img 
              src="/expense_receipt.png" 
              alt="Expense Tracker Preview" 
              style={{ width: '100%', borderRadius: '8px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
