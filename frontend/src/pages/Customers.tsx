import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getAuthToken, removeAuthToken } from '../services/api';

export default function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const res = await fetchApi('/billing/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
      if ((error as Error).message === 'Unauthorized: Token is invalid or expired') {
        removeAuthToken();
        navigate('/login');
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await fetchApi(`/billing/customers/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ name, email, phone }),
        });
      } else {
        await fetchApi('/billing/customers', {
          method: 'POST',
          body: JSON.stringify({ name, email, phone }),
        });
      }
      closeModal();
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openEditModal = (c: any) => {
    setEditId(c.id);
    setName(c.name);
    setEmail(c.email || '');
    setPhone(c.phone);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Customer Management</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your client relationships and view their details.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Add Customer
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Phone</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <td style={{ padding: '20px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{c.email || 'N/A'}</td>
                <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{c.phone}</td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  <button onClick={() => openEditModal(c)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customers found. Click "Add Customer" to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="glass-panel" style={{ width: '400px', background: 'var(--bg-secondary)' }}>
            <h3 style={{ marginBottom: '24px' }}>{editId ? 'Edit Customer' : 'Add New Customer'}</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input required className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input required className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editId ? 'Update Customer' : 'Save Customer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
