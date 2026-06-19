import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken, removeAuthToken } from '../services/api';
import toast from 'react-hot-toast';

export default function VATProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    trn: '',
    jurisdiction: 'ONSHORE',
    vatPercentage: 5.0
  });

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [navigate]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await fetchApi('/organization/profile');
      if (res.data) {
        setFormData({
          companyName: res.data.companyName || '',
          trn: res.data.trn || '',
          jurisdiction: res.data.jurisdiction || 'ONSHORE',
          vatPercentage: res.data.vatPercentage !== undefined ? Number(res.data.vatPercentage) : 5.0,
        });
      }
    } catch (error) {
      console.error(error);
      if ((error as Error).message === 'Unauthorized: Token is invalid or expired') {
        removeAuthToken();
        navigate('/login');
      } else {
        toast.error('Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await fetchApi('/organization/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...formData,
          vatPercentage: Number(formData.vatPercentage)
        })
      });
      toast.success('VAT Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  return (
    <div style={{ padding: '20px 0', maxWidth: '600px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 className="text-gradient">VAT Profile</h1>
        <p className="text-muted" style={{ marginTop: '8px' }}>Manage your organization's tax configuration and details.</p>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-input"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tax Registration Number (TRN)</label>
            <input
              type="text"
              name="trn"
              className="form-input"
              value={formData.trn}
              onChange={handleChange}
              placeholder="e.g. 100000000000003"
              maxLength={15}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">VAT Percentage (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              name="vatPercentage"
              className="form-input"
              value={formData.vatPercentage}
              onChange={handleChange}
              placeholder="5.0"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '10px' }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
