import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import { Building2, FileText, Globe, Percent, Save, AlertCircle, CheckCircle2, Upload, X } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    trn: '',
    jurisdiction: 'ONSHORE',
    vatPercentage: 5,
    logoUrl: ''
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetchApi('/organization/profile');
        if (response.data) {
          setFormData({
            companyName: response.data.companyName || '',
            trn: response.data.trn || '',
            jurisdiction: response.data.jurisdiction || 'ONSHORE',
            vatPercentage: response.data.vatPercentage || 5,
            logoUrl: response.data.logoUrl || ''
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, logoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await fetchApi('/organization/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...formData,
          vatPercentage: Number(formData.vatPercentage)
        })
      });
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '20px 0', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Edit Profile</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Update your account information and settings.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving || loading}
          style={{ 
            padding: '12px 24px', borderRadius: '12px', border: 'none', 
            background: 'linear-gradient(135deg, var(--accent-primary), #6366f1)', 
            color: 'white', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)',
            opacity: (saving || loading) ? 0.7 : 1,
            transition: 'all 0.2s'
          }}>
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {success && (
        <div style={{ background: '#ecfdf5', border: '1px solid #34d399', color: '#047857', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', animation: 'fadeIn 0.3s' }}>
          <CheckCircle2 size={20} /> {success}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(139, 92, 246, 0.2)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div className="glass-panel" style={{ 
          padding: '40px', 
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
          boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
          border: '1px solid rgba(255,255,255,0.5)',
          maxWidth: '800px'
        }}>
          
          <h2 style={{ fontSize: '1.4rem', color: '#1e293b', margin: '0 0 24px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>Organization Details</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Profile Picture Upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ 
                width: '100px', height: '100px', 
                borderRadius: '20px', 
                background: formData.logoUrl ? `url(${formData.logoUrl}) center/cover` : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', fontSize: '2.5rem', fontWeight: 700,
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                border: '2px solid white'
              }}>
                {!formData.logoUrl && (formData.companyName?.charAt(0).toUpperCase() || <Building2 size={40} />)}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>Organization Logo</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ background: 'white', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', fontWeight: 500, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                  >
                    <Upload size={16} /> Upload New
                  </button>
                  {formData.logoUrl && (
                    <button 
                      onClick={removeImage}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '8px', fontWeight: 500, color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
                    >
                      <X size={16} /> Remove
                    </button>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Recommended size: 256x256px. Max 2MB.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={16} color="#6366f1" /> Company Name
              </label>
              <input 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange}
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', color: '#1e293b', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} color="#6366f1" /> Tax Registration Number (TRN)
                </label>
                <input 
                  name="trn" 
                  value={formData.trn} 
                  onChange={handleChange}
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', color: '#1e293b', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={16} color="#6366f1" /> Jurisdiction
                </label>
                <select 
                  name="jurisdiction" 
                  value={formData.jurisdiction} 
                  onChange={handleChange}
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', color: '#1e293b', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="ONSHORE">Onshore</option>
                  <option value="FREE_ZONE">Free Zone</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '50%' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Percent size={16} color="#6366f1" /> VAT Percentage
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  name="vatPercentage" 
                  type="number"
                  step="0.1"
                  value={formData.vatPercentage} 
                  onChange={handleChange}
                  style={{ padding: '12px 16px', paddingRight: '40px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '1rem', color: '#1e293b', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
                <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>%</span>
              </div>
            </div>

          </div>
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
