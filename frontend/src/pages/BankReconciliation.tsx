import { useNavigate } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function BankReconciliation() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header section */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 32px 0 32px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer' }}>Nafter Web Technologies</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#94a3b8' }}>Payment Accounts</span>
          <span style={{ margin: '0 8px' }}>&gt;</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#334155', margin: 0 }}>Payment Accounts</h1>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <button style={{ background: '#e11d48', color: 'white', border: '1px solid #be123c', borderRight: 'none', padding: '10px 20px', borderRadius: '6px 0 0 6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '1rem', zIndex: 10, position: 'relative' }}>
              <span style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 300 }}>+</span> New Payments Account
            </button>
            <button style={{ background: '#be123c', color: 'white', border: '1px solid #9f1239', borderLeft: '1px solid #f43f5e', padding: '0 12px', borderRadius: '0 6px 6px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0' }}>
          <div onClick={() => navigate('/payment-accounts')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            All Payment Accounts
          </div>
          <div onClick={() => navigate('/bank-accounts')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Bank Accounts
          </div>
          <div onClick={() => navigate('/employee-accounts')} style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1e293b'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
            Employee Accounts
          </div>
          <div style={{ color: '#8b5cf6', fontWeight: 600, paddingBottom: '12px', borderBottom: '3px solid #8b5cf6', cursor: 'pointer', fontSize: '1.05rem' }}>
            Bank Reconciliation
          </div>
          <div style={{ color: '#64748b', fontWeight: 500, paddingBottom: '12px', cursor: 'pointer', fontSize: '1.05rem' }}>
            Refrens Payments
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px', display: 'flex', justifyContent: 'center' }}>
        
        {/* Promotional Card */}
        <div style={{ maxWidth: '640px', width: '100%', background: 'white', borderRadius: '12px', padding: '48px 40px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px', lineHeight: 1.3 }}>
            Reconcile your Books of<br />Accounts with your Bank<br />Statements
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '40px', padding: '0 20px' }}>
            Bank reconciliation helps you maintain precise financial records by automatically matching transactions and identifying discrepancies for confident cash flow management.
          </p>
          
          {/* Mockup Graphic container */}
          <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '40px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', position: 'relative' }}>
             
             {/* Mock App Window */}
             <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #cbd5e1', height: '280px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                {/* Mock Header */}
                <div style={{ height: '40px', background: '#8b5cf6', width: '100%', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></div>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></div>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></div>
                </div>
                {/* Mock Content */}
                <div style={{ padding: '24px', display: 'flex', gap: '20px' }}>
                   <div style={{ width: '60px', height: '200px', background: '#f1f5f9', borderRadius: '6px' }}></div>
                   <div style={{ flex: 1 }}>
                     <div style={{ height: '16px', width: '40%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '24px' }}></div>
                     <div style={{ height: '12px', width: '100%', background: '#f8fafc', borderRadius: '4px', marginBottom: '12px' }}></div>
                     <div style={{ height: '12px', width: '100%', background: '#f8fafc', borderRadius: '4px', marginBottom: '12px' }}></div>
                     <div style={{ height: '12px', width: '100%', background: '#f8fafc', borderRadius: '4px', marginBottom: '12px' }}></div>
                     <div style={{ height: '12px', width: '80%', background: '#f8fafc', borderRadius: '4px', marginBottom: '12px' }}></div>
                   </div>
                </div>

                {/* Overlapping Mock Modal */}
                <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '280px', height: '220px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '12px', boxShadow: '-5px -5px 20px rgba(0,0,0,0.08)' }}>
                   <div style={{ padding: '16px' }}>
                      <div style={{ height: '14px', width: '50%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '24px' }}></div>
                      <div style={{ height: '10px', width: '30%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div style={{ height: '36px', width: '100%', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}></div>
                      <div style={{ height: '10px', width: '40%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div style={{ height: '36px', width: '100%', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}></div>
                   </div>
                </div>
             </div>
          </div>

          <button style={{ background: '#8b5cf6', color: 'white', border: 'none', width: '100%', padding: '16px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', marginBottom: '24px', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }} onMouseOver={e => e.currentTarget.style.background = '#7c3aed'} onMouseOut={e => e.currentTarget.style.background = '#8b5cf6'}>
            Upgrade to Accounts
          </button>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '1.15rem' }}>Learn More</span>
            <ExternalLink size={20} color="#8b5cf6" />
          </div>

        </div>

      </div>
    </div>
  );
}
