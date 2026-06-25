import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { Play, CloudUpload } from 'lucide-react';

export default function PurchaseOrders() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', background: '#f8fafc' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '48px 40px', maxWidth: '640px', width: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', textAlign: 'center', border: '1px solid #f1f5f9' }}>
        
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Purchase Orders</h1>
        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '40px', padding: '0 20px' }}>
          Create, Share, and Track Purchase Orders to Streamline Your Buying Process.
        </p>

        {/* Video Card */}
        <div style={{ background: '#421699', borderRadius: '12px', padding: '40px', position: 'relative', overflow: 'hidden', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(66, 22, 153, 0.2)' }}>
          
          <div style={{ position: 'absolute', top: '32px', left: '32px', background: '#b46222', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
            Demo Video
          </div>

          <div style={{ position: 'absolute', bottom: '16px', right: '20px', color: '#c4b5fd', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
             Refrens
          </div>

          <h2 style={{ color: '#c4b5fd', fontSize: '2.4rem', fontWeight: 700, opacity: 0.4, textAlign: 'left', alignSelf: 'flex-start', lineHeight: '1.2', marginTop: '40px', zIndex: 1 }}>
            Refrens Purchase<br/>Order Generator
          </h2>

          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 2 }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(66, 22, 153, 0.4)' }}>
              <Play size={36} color="white" fill="white" style={{ marginLeft: '6px' }} />
            </div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>Watch Demo Video</div>
          </div>
        </div>

        {/* Primary Button */}
        <button 
          onClick={() => navigate('/purchase-orders/create')}
          style={{ width: '100%', padding: '16px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.15rem', fontWeight: 600, cursor: 'pointer', marginBottom: '24px', transition: 'background 0.2s', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#7c3aed'}
          onMouseOut={(e) => e.currentTarget.style.background = '#8b5cf6'}
        >
          Create First Purchase Order
        </button>

        {/* Secondary Button */}
        <button 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '16px', background: 'transparent', color: '#8b5cf6', border: 'none', fontSize: '1.15rem', fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = '#7c3aed'}
          onMouseOut={(e) => e.currentTarget.style.color = '#8b5cf6'}
        >
          <CloudUpload size={24} /> Upload Purchase Orders
        </button>

      </div>
    </div>
  );
}
