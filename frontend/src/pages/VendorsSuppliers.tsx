import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import VendorModal from '../components/VendorModal';
import { Edit2, Trash2 } from 'lucide-react';

export default function VendorsSuppliers() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    } else {
      loadVendors();
    }
  }, [navigate]);

  const loadVendors = async () => {
    try {
      const res = await fetchApi('/vendors');
      setVendors(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedVendor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await fetchApi(`/vendors/${id}`, { method: 'DELETE' });
      loadVendors();
    } catch (err) {
      console.error(err);
      alert('Failed to delete vendor');
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Vendors & Suppliers</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your vendors and suppliers.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
          Add Vendor
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No vendors found. Click "Add Vendor" to get started.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Company</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Phone</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 500, color: '#0f172a' }}>{vendor.name}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{vendor.company || '-'}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{vendor.email || '-'}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{vendor.phone || '-'}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(vendor)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', marginRight: '12px' }}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(vendor.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <VendorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadVendors}
        vendor={selectedVendor}
      />
    </div>
  );
}
