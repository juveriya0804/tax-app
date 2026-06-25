import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { Landmark, Users, CreditCard, Sparkles, DollarSign } from 'lucide-react';

export default function DebitNotes() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', background: '#f8fafc' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '48px 40px', maxWidth: '680px', width: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', textAlign: 'center', border: '1px solid #f1f5f9' }}>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Debit Notes</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px', padding: '0 20px' }}>
          Rectify Invoice Values With Debit Notes. Create, Share,<br/>Track, and Manage All Debit Notes In One Place.
        </p>

        {/* Illustration Container */}
        <div style={{ 
          background: '#eef2f6', 
          borderRadius: '16px', 
          height: '300px', 
          position: 'relative', 
          overflow: 'hidden', 
          marginBottom: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          
          {/* Grid lines background overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: 0 }}></div>
          
          {/* Main Document */}
          <div style={{ width: '200px', height: '240px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', padding: '24px', zIndex: 10 }}>
            {/* Row 1 */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '40%' }}></div>
              <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '40%' }}></div>
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '30%' }}></div>
              <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '50%' }}></div>
            </div>
            {/* Row 3 */}
            <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '80%', marginBottom: '24px' }}></div>
            
            {/* Purple Line */}
            <div style={{ height: '6px', background: '#a78bfa', borderRadius: '3px', width: '100%', marginBottom: '24px' }}></div>
            
            {/* Grid rows */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '15%' }}></div>
            </div>
            
            {/* Bottom lines */}
            <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '70%', marginBottom: '12px' }}></div>
            <div style={{ height: '6px', background: '#cbd5e1', borderRadius: '3px', width: '50%' }}></div>
          </div>

          {/* Floating Elements */}
          <div style={{ position: 'absolute', top: '60px', left: '22%', width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', zIndex: 11 }}>
            <Landmark size={24} color="#38bdf8" />
          </div>
          
          <div style={{ position: 'absolute', bottom: '60px', left: '14%', width: '64px', height: '64px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transform: 'rotate(-15deg)', zIndex: 11 }}>
            <CreditCard size={32} color="#84cc16" />
          </div>

          <div style={{ position: 'absolute', bottom: '65px', right: '16%', width: '56px', height: '56px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', zIndex: 11 }}>
            <Users size={28} color="#fb7185" />
          </div>

          <div style={{ position: 'absolute', top: '50px', right: '24%', width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', zIndex: 11 }}>
            <Sparkles size={20} color="#fbbf24" />
          </div>

          <div style={{ position: 'absolute', bottom: '35px', right: '6%', width: '40px', height: '36px', background: '#9f7aea', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11 }}>
            <DollarSign size={20} color="white" />
          </div>

        </div>

        {/* Primary Button */}
        <button 
          onClick={() => navigate('/debit-notes/create')}
          style={{ width: '100%', padding: '18px', background: '#9f7aea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 600, cursor: 'pointer', marginBottom: '16px', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(159, 122, 234, 0.2)' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#8b5cf6'}
          onMouseOut={(e) => e.currentTarget.style.background = '#9f7aea'}
        >
          Create First Debit Note
        </button>

      </div>
    </div>
  );
}
