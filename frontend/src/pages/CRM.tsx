import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

export default function CRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => { loadLeads(); }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const res = await fetchApi('/crm/leads');
      setLeads(res.data || []);
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/crm/leads', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      toast.success('Lead added successfully');
      setFormData({ name: '', email: '', phone: '' });
      loadLeads();
    } catch (err) {
      toast.error('Failed to add lead');
    }
  };

  const updateStatus = async (leadId: string, status: string) => {
    try {
      await fetchApi(`/crm/leads/${leadId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      toast.success('Status updated');
      loadLeads();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-gradient" style={{ marginBottom: '24px' }}>Sales CRM & Leads</h1>

      <div className="glass-panel" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Add New Lead</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label className="form-label">Phone</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '14px 24px' }}>Add Lead</button>
        </form>
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '16px' }}>Current Leads</h3>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Contact Info</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '12px' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.9rem' }}>{lead.email}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: lead.status === 'NEW' ? 'rgba(37, 99, 235, 0.1)' : 
                                    lead.status === 'CONTACTED' ? 'rgba(245, 158, 11, 0.1)' : 
                                    lead.status === 'QUALIFIED' ? 'rgba(16, 185, 129, 0.1)' : 
                                    'rgba(239, 68, 68, 0.1)',
                        color: lead.status === 'NEW' ? 'var(--accent-primary)' : 
                               lead.status === 'CONTACTED' ? 'var(--warning)' : 
                               lead.status === 'QUALIFIED' ? 'var(--success)' : 
                               'var(--danger)',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="LOST">Lost</option>
                    </select>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No leads found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
