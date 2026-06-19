import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetchApi('/inventory');
      setProducts(Array.isArray(res) ? res : (res.data || []));
    } catch (err: any) {
      console.error(err);
      alert('Failed to load inventory: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/inventory', {
        method: 'POST',
        body: JSON.stringify({
          name,
          sku,
          price: parseFloat(price),
          stockQuantity: parseInt(stockQuantity, 10),
        }),
      });
      setShowModal(false);
      setName('');
      setSku('');
      setPrice('');
      setStockQuantity('');
      loadProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const adjustStock = async (id: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      await fetchApi(`/inventory/${id}/stock`, {
        method: 'PUT',
        body: JSON.stringify({ stockQuantity: newStock }),
      });
      loadProducts();
    } catch (err: any) {
      alert('Failed to update stock: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient">Inventory Management</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>Manage your product catalog and stock levels.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Product</button>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>SKU</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Price</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Stock</th>
              <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Adjust</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center' }}>Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No products found. Click "Add Product" to get started!
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <td style={{ padding: '20px', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '20px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{p.sku}</td>
                  <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>₹{Number(p.price).toFixed(2)}</td>
                  <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      background: p.stockQuantity > 5 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: p.stockQuantity > 5 ? 'var(--success)' : 'var(--danger)',
                      fontWeight: 600
                    }}>
                      {p.stockQuantity}
                    </span>
                  </td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <button onClick={() => adjustStock(p.id, p.stockQuantity, -1)} style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(0,0,0,0.1)', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>-</button>
                    <button onClick={() => adjustStock(p.id, p.stockQuantity, 1)} style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(0,0,0,0.1)', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                  </td>
                </tr>
              ))
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
            <h3 style={{ marginBottom: '24px' }}>Add New Product</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input required className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Premium Coffee Beans" />
              </div>
              <div className="form-group">
                <label className="form-label">SKU</label>
                <input required className="form-input" value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. COF-001" />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input required type="number" step="0.01" className="form-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
              </div>
              <div className="form-group">
                <label className="form-label">Initial Stock</label>
                <input required type="number" className="form-input" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} placeholder="0" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
