import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { UploadCloud, Building2, CreditCard, Users, DollarSign, Sparkles } from 'lucide-react';

export default function DeliveryChallans() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      padding: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Heading */}
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 700, 
        color: '#2a303e', 
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        Delivery Challans
      </h1>
      
      {/* Subtitle */}
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#64748b', 
        textAlign: 'center',
        maxWidth: '500px',
        marginBottom: '40px',
        lineHeight: 1.5
      }}>
        Create, Share, and Track Delivery Challans for Transportation or Delivery of Goods.
      </p>

      {/* Vector Illustration Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        height: '280px',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        borderRadius: '16px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.5)'
      }}>
        {/* Subtle background grid pattern */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.5
        }}></div>

        {/* Floating Icons */}
        <div style={{ position: 'absolute', top: '40px', left: '60px', background: 'white', padding: '12px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 2 }}>
          <Building2 size={24} color="#0ea5e9" />
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', left: '50px', background: 'white', padding: '14px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 2, transform: 'rotate(-15deg)' }}>
          <CreditCard size={32} color="#84cc16" />
        </div>

        <div style={{ position: 'absolute', bottom: '60px', right: '60px', background: 'white', padding: '12px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 2 }}>
          <Users size={28} color="#fb7185" />
        </div>

        <div style={{ position: 'absolute', top: '20px', right: '140px', background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 3 }}>
          <Sparkles size={20} color="#fbbf24" />
        </div>

        {/* Main Document Shape */}
        <div style={{
          background: 'white',
          width: '220px',
          height: '240px',
          borderRadius: '12px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1
        }}>
          {/* Header Lines */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '40%', height: '6px', background: '#e2e8f0', borderRadius: '4px' }}></div>
            <div style={{ width: '30%', height: '6px', background: '#e2e8f0', borderRadius: '4px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ width: '60%', height: '8px', background: '#cbd5e1', borderRadius: '4px' }}></div>
            <div style={{ width: '30%', height: '8px', background: '#cbd5e1', borderRadius: '4px' }}></div>
          </div>
          
          {/* Separator */}
          <div style={{ width: '100%', height: '6px', background: '#8b5cf6', borderRadius: '4px', marginBottom: '8px' }}></div>

          {/* Grid lines */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ width: '40%', height: '6px', background: '#f1f5f9', borderRadius: '4px' }}></div>
              <div style={{ width: '20%', height: '6px', background: '#f1f5f9', borderRadius: '4px' }}></div>
              <div style={{ width: '20%', height: '6px', background: '#f1f5f9', borderRadius: '4px' }}></div>
            </div>
          ))}

          {/* Bottom section with purple badge */}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '60%' }}>
              <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px' }}></div>
              <div style={{ width: '80%', height: '6px', background: '#e2e8f0', borderRadius: '4px' }}></div>
            </div>
            <div style={{ 
              background: '#8b5cf6', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={14} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}>
        <button 
          onClick={() => navigate('/delivery-challans/create')}
          style={{
          background: '#8b5cf6',
          color: 'white',
          border: 'none',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Create First Delivery Challan
        </button>

        <button style={{
          background: 'transparent',
          color: '#8b5cf6',
          border: 'none',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <UploadCloud size={20} /> Upload Delivery Challans
        </button>
      </div>

    </div>
  );
}
