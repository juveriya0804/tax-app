import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { ChevronDown, Download, Plus, Search, Filter, CloudUpload } from 'lucide-react';

export default function SalesOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [salesOrders, setSalesOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
    const saved = JSON.parse(localStorage.getItem('salesOrders') || '[]');
    setSalesOrders(saved);
  }, [navigate]);

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Nafter Web Technologies &gt; <span style={{ color: 'var(--text-primary)' }}>Sales Orders</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Sales Orders 
            <span style={{ fontSize: '1.2rem' }}>🔆</span>
          </h1>
          <button 
            onClick={() => navigate('/sales-orders/create')}
            style={{ 
              background: '#8b5cf6',
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
            }}
          >
            <Plus size={18} /> Create Sales Order <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <div 
          onClick={() => setActiveTab('Overview')}
          style={{ 
            padding: '12px 24px', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'Overview' ? 600 : 500,
            color: activeTab === 'Overview' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Overview' ? '2px solid var(--accent-primary)' : '2px solid transparent'
          }}
        >
          Overview
        </div>
        <div 
          onClick={() => setActiveTab('Tag-wise')}
          style={{ 
            padding: '12px 24px', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'Tag-wise' ? 600 : 500,
            color: activeTab === 'Tag-wise' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Tag-wise' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Tag-wise Report <span style={{ fontSize: '1rem' }}>💎</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <select className="form-input" style={{ width: '250px', background: 'transparent' }}>
            <option>Active Sales Order</option>
            <option>Draft Sales Order</option>
            <option>Deleted Sales Order</option>
          </select>

          <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Download size={16} /> Download CSV
          </button>
        </div>

        {/* Filters Section */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: filtersOpen ? '20px' : '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <Search size={16} /> Search Sales Orders...
              </div>
            </div>
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500 }}
            >
              <Filter size={16} /> Filters {filtersOpen ? <ChevronDown size={16} style={{ transform: 'rotate(180deg)' }} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {filtersOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</label>
                <select className="form-input" style={{ width: '100%', background: 'white' }}>
                  <option>All Statuses</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Search Client</label>
                <select className="form-input" style={{ width: '100%', background: 'white' }}>
                  <option>All Clients</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Date Range</label>
                <input type="text" className="form-input" placeholder="Start Date - End Date" style={{ width: '100%', background: 'white' }} />
              </div>
            </div>
          )}
        </div>

        {/* Data Area */}
        {salesOrders.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
            <div style={{ maxWidth: '550px', textAlign: 'center' }}>
              
              <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '16px', fontWeight: 700 }}>
                Sales Order
              </h2>
              
              <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '32px', lineHeight: '1.6' }}>
                Create, Share, and Track Sales Orders.<br />
                Anticipate Future Revenues and Keep Track of<br />
                Order Fulfillment.
              </p>

              <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src="/sales_order_empty.png" 
                  alt="Sales Order Illustration" 
                  style={{ width: '100%', maxWidth: '400px', borderRadius: '16px' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <button 
                  onClick={() => navigate('/sales-orders/create')}
                  style={{ 
                    width: '100%',
                    maxWidth: '400px',
                    padding: '16px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: '#8b5cf6', 
                    color: 'white', 
                    fontSize: '1.1rem',
                    fontWeight: 600, 
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.25)'
                  }}
                >
                  Create First Sales Order
                </button>
                
                <button 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    maxWidth: '400px',
                    padding: '16px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: 'transparent', 
                    color: '#8b5cf6', 
                    fontSize: '1.1rem',
                    fontWeight: 600, 
                    cursor: 'pointer'
                  }}
                >
                  <CloudUpload size={24} />
                  Upload Sales Orders
                </button>
              </div>

            </div>
          </div>
        ) : (
          <div style={{ marginTop: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                  <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Issue Date</th>
                  <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Valid Until</th>
                  <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.map((order) => {
                  const total = order.items.reduce((acc: number, item: any) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);
                  return (
                    <tr key={order.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                      <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{order.customerName}</td>
                      <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{new Date(order.issueDate).toLocaleDateString()}</td>
                      <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{new Date(order.validUntil).toLocaleDateString()}</td>
                      <td style={{ padding: '20px', fontWeight: 600 }}>₹{total.toFixed(2)}</td>
                      <td style={{ padding: '20px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          background: '#fffbeb',
                          color: '#d97706'
                        }}>
                          DRAFT
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
