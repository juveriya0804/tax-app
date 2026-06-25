import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { Search, Star, Briefcase, Code, PenTool, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HireVendors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)', borderRadius: '24px', padding: '60px 40px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '250px', height: '250px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', zIndex: 10, letterSpacing: '-0.02em' }}>Hire The Best Vendors</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.95, maxWidth: '640px', lineHeight: '1.6', marginBottom: '48px', zIndex: 10 }}>
          Connect with top-rated professionals, verified suppliers, and industry consultants to accelerate your business growth. Quality work, guaranteed.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', background: 'white', padding: '8px', borderRadius: '16px', width: '100%', maxWidth: '640px', zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color: '#94a3b8' }}>
            <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="Search for 'Accountants', 'IT Services', 'Suppliers'..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.1rem', color: '#1e293b' }}
          />
          <button style={{ background: '#1e293b', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#0f172a'}
            onMouseOut={e => e.currentTarget.style.background = '#1e293b'}
          >
            Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Popular Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {[
          { icon: <Briefcase size={28} color="#8b5cf6" />, title: 'Accounting & Finance', count: '1,240 verified experts' },
          { icon: <Code size={28} color="#3b82f6" />, title: 'IT & Development', count: '3,100 verified experts' },
          { icon: <PenTool size={28} color="#ec4899" />, title: 'Design & Marketing', count: '2,800 verified experts' },
          { icon: <Shield size={28} color="#10b981" />, title: 'Legal Consultants', count: '850 verified experts' }
        ].map((cat, idx) => (
          <div key={idx} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 20px -3px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <div style={{ background: '#f8fafc', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cat.icon}
            </div>
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: '#1e293b' }}>{cat.title}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{cat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Vendors */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Featured Experts</h2>
        <button style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseOver={e => e.currentTarget.style.color = '#7c3aed'}
          onMouseOut={e => e.currentTarget.style.color = '#8b5cf6'}
        >
          View All <ArrowRight size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {[
          { name: 'Apex Accounting Solutions', type: 'Tax & Audit Services', rating: 4.9, reviews: 128, rate: '$150/hr', img: 'A', bg: '#8b5cf6' },
          { name: 'Nexus Tech Innovators', type: 'Software Development', rating: 5.0, reviews: 84, rate: '$85/hr', img: 'N', bg: '#3b82f6' },
          { name: 'Global Supply Chain Co.', type: 'Logistics & Supply', rating: 4.8, reviews: 312, rate: 'Custom', img: 'G', bg: '#10b981' },
        ].map((vendor, idx) => (
          <div key={idx} style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <div style={{ height: '80px', background: `linear-gradient(90deg, ${vendor.bg}22 0%, ${vendor.bg}44 100%)` }}></div>
            <div style={{ padding: '0 24px 24px 24px', position: 'relative' }}>
              <div style={{ width: '64px', height: '64px', background: vendor.bg, color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '-32px', marginBottom: '16px', border: '4px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {vendor.img}
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {vendor.name} <CheckCircle2 size={18} color="#10b981" />
              </h3>
              <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '1rem' }}>{vendor.type}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={18} color="#eab308" fill="#eab308" />
                  <span style={{ fontWeight: 600, color: '#334155', fontSize: '1.05rem' }}>{vendor.rating}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>({vendor.reviews} reviews)</span>
                </div>
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>
                  {vendor.rate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
