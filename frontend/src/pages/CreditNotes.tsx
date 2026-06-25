import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { UploadCloud, Play } from 'lucide-react';

export default function CreditNotes() {
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
        Credit Notes
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
        Provide Rebates To Customers With Credit Notes. Create, Share, Track, and Manage All Credit Notes In One Place.
      </p>

      {/* Video Thumbnail Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        height: '280px',
        background: '#4c1d95', // Deep purple
        borderRadius: '12px',
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(76, 29, 149, 0.2)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* Demo Video Badge */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: '#b45309', // Amber/orange dark
          color: '#fef3c7',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          Demo Video
        </div>

        {/* Generator Text (background opaque) */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '24px',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.2,
          maxWidth: '300px'
        }}>
          Refrens Credit Note Generator
        </div>

        {/* Play Button Overlay */}
        <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)'
          }}>
            <Play size={32} color="white" fill="white" style={{ marginLeft: '6px' }} />
          </div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Watch Demo Video</span>
        </div>

        {/* Refrens Logo Text */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.6)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)' }}></div>
          Refrens
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}>
        <button 
          onClick={() => navigate('/credit-notes/create')}
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
          Create First Credit Note
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
          <UploadCloud size={20} /> Upload Credit Notes
        </button>
      </div>

    </div>
  );
}
