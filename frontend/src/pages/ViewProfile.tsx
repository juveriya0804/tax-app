import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import { Building2, FileText, Globe, Percent, User, Mail, ShieldCheck } from 'lucide-react';

export default function ViewProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetchApi('/organization/profile');
        setProfile(response.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  return (
    <div style={{ padding: '20px 0', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Profile Details</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Manage your organization's core information and settings.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(139, 92, 246, 0.2)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : profile ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          
          {/* Main Organization Card */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '24px', 
            padding: '40px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
            border: '1px solid rgba(255,255,255,0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
              <div style={{ 
                width: '80px', height: '80px', 
                borderRadius: '20px', 
                background: profile.logoUrl ? `url(${profile.logoUrl}) center/cover` : 'linear-gradient(135deg, #8b5cf6, #3b82f6)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '2.5rem', fontWeight: 700,
                boxShadow: '0 10px 20px rgba(139,92,246,0.3)'
              }}>
                {!profile.logoUrl && (profile.companyName?.charAt(0).toUpperCase() || <Building2 size={32} />)}
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: '#1e293b', margin: '0 0 8px 0', fontWeight: 700 }}>{profile.companyName}</h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Verified Organization
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ProfileItem icon={<FileText size={20} />} label="Tax Registration Number (TRN)" value={profile.trn} />
              <ProfileItem icon={<Globe size={20} />} label="Jurisdiction" value={profile.jurisdiction} />
              <ProfileItem icon={<Percent size={20} />} label="VAT Percentage" value={`${profile.vatPercentage}%`} />
            </div>
          </div>

          {/* Quick Actions / Settings Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '24px', padding: '32px', color: 'white',
              boxShadow: '0 20px 40px rgba(15,23,42,0.2)'
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.4rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={24} color="#38bdf8" /> Account Status
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                Your organization profile is active and fully configured. All tax and billing features are currently unlocked.
              </p>
              <button style={{ 
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', width: '100%',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                Edit Profile Settings
              </button>
            </div>

            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', border: '1px dashed #cbd5e1', background: 'rgba(255,255,255,0.5)' }}>
               <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', color: '#334155' }}>Need Help?</h3>
               <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 20px 0' }}>Contact support for assistance with your account setup or billing inquiries.</p>
               <button className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#475569', cursor: 'pointer' }}>
                 <Mail size={18} /> Contact Support
               </button>
            </div>
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
          Could not load profile details.
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(241, 245, 249, 0.5)', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
      <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {icon}
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{value}</div>
      </div>
    </div>
  );
}
