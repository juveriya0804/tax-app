import { useEffect, useState } from 'react';
import { fetchApi } from '../services/api';
import toast from 'react-hot-toast';

export default function POS() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ product: any; quantity: number }[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  
  useEffect(() => {
    loadProducts();
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await fetchApi('/billing/customers');
      setCustomers(res.data || []);
    } catch (err) {
      console.error('Failed to load customers', err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetchApi('/inventory');
      setProducts(Array.isArray(res) ? res : (res.data || []));
    } catch (err: any) {
      toast.error('Failed to load inventory: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: any) => {
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock!');
      return;
    }
    
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stockQuantity) {
          toast.error('Cannot exceed available stock');
          return prev;
        }
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQ = item.quantity + delta;
          if (newQ <= 0) return { ...item, quantity: 0 }; // Will be filtered out below
          if (newQ > item.product.stockQuantity) {
            toast.error('Cannot exceed available stock');
            return item;
          }
          return { ...item, quantity: newQ };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    try {
      const payload: any = {
        items: cart.map(c => ({ productId: c.product.id, quantity: c.quantity }))
      };
      if (selectedCustomer) {
        payload.customerId = selectedCustomer;
      }
      
      const res = await fetchApi('/pos/checkout', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      toast.success(`Sale Complete! Generated Invoice: ${res.invoice.invoiceNumber}`);
      setCart([]);
      loadProducts(); // Refresh stock
    } catch (err: any) {
      toast.error('Checkout failed: ' + err.message);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 40px)', gap: '24px', paddingBottom: '20px' }}>
      {/* Products Grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 className="text-gradient" style={{ marginBottom: '8px' }}>Point of Sale</h1>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Select products to add to cart.</p>
        
        <div style={{ 
          flex: 1, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '20px',
          alignContent: 'start',
          overflowY: 'auto',
          paddingRight: '12px'
        }}>
          {loading ? (
            <div className="text-muted">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-muted">No products available in inventory.</div>
          ) : (
            products.map((p) => (
              <div 
                key={p.id} 
                className="glass-panel" 
                style={{ 
                  padding: '20px', 
                  cursor: p.stockQuantity > 0 ? 'pointer' : 'not-allowed',
                  opacity: p.stockQuantity > 0 ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
                onClick={() => p.stockQuantity > 0 && addToCart(p)}
              >
                <h3 style={{ fontSize: '1.1rem' }}>{p.name}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.sku}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '8px' }}>
                  ₹{Number(p.price).toFixed(2)}
                </div>
                <div style={{ 
                  marginTop: 'auto', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  color: p.stockQuantity > 0 ? 'var(--success)' : 'var(--danger)'
                }}>
                  {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : 'Out of stock'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="glass-panel" style={{ width: '380px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.5)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Current Order</h2>
          <select 
            className="form-input" 
            value={selectedCustomer} 
            onChange={(e) => setSelectedCustomer(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">Walk-in Customer (No Account)</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div className="text-muted" style={{ textAlign: 'center', marginTop: '40px' }}>Cart is empty</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.product.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>₹{Number(item.product.price).toFixed(2)} / ea</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <button onClick={() => updateQuantity(item.product.id, -1)} style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer', fontWeight: 600 }}>-</button>
                      <div style={{ minWidth: '24px', textAlign: 'center', fontWeight: 500, fontSize: '0.9rem' }}>{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.product.id, 1)} style={{ background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer', fontWeight: 600 }}>+</button>
                    </div>
                    <div style={{ fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>
                      ₹{(Number(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            <span>VAT (5%)</span>
            <span>₹{vat.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.25rem', fontWeight: 700 }}>
            <span>Total</span>
            <span className="text-gradient">₹{total.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: cart.length === 0 ? 0.5 : 1 }}
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
}
