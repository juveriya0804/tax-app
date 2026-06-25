import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import { ChevronRight, ChevronDown, Download, Search, Columns, Filter, Plus, ArrowUpDown } from 'lucide-react';

export default function VendorsSuppliers() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<any[]>([]);
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
      const apiVendors = res || [];
      const localVendors = JSON.parse(localStorage.getItem('vendorsSuppliersExt') || '[]');
      setVendors([...localVendors, ...apiVendors]);
    } catch (err) {
      console.error(err);
      const localVendors = JSON.parse(localStorage.getItem('vendorsSuppliersExt') || '[]');
      setVendors(localVendors);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/vendors-suppliers/create');
  };

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
        Nafter Web Technologies &gt; <span style={{ color: 'var(--text-primary)' }}>Manage Vendors</span> &gt;
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#1f2937', margin: 0 }}>Manage Vendors</h1>
        
        <div style={{ display: 'flex' }}>
          <button 
            onClick={handleAdd}
            style={{ 
              background: '#e11d48', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '6px 0 0 6px', 
              fontWeight: 500, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} /> Add Vendor
          </button>
          <button 
            style={{ 
              background: '#be123c', 
              color: 'white', 
              border: 'none', 
              padding: '10px 12px', 
              borderRadius: '0 6px 6px 0', 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer'
            }}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: '24px' }}>
        <div style={{ paddingBottom: '12px', borderBottom: '2px solid #6366f1', color: '#6366f1', fontWeight: 500, cursor: 'pointer' }}>
          All Vendors
        </div>
        <div style={{ paddingBottom: '12px', color: 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Reports and More <ChevronRight size={16} />
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <div style={{ color: 'var(--text-primary)', fontWeight: 500, cursor: 'pointer' }}>
          Active Vendors
        </div>
        <div style={{ color: 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer' }}>
          Archived Vendors
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginBottom: '24px' }}>
        <button style={{ 
          background: 'transparent', 
          border: '1px solid rgba(0,0,0,0.1)', 
          color: 'var(--text-primary)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          <Download size={16} /> Download CSV
        </button>

        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search Vendors" 
            style={{ 
              padding: '8px 12px 8px 36px', 
              borderRadius: '6px', 
              border: '1px solid rgba(0,0,0,0.1)', 
              outline: 'none',
              width: '200px'
            }} 
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            {vendors.length === 0 ? 'No Vendor Found' : `${vendors.length} Vendor(s) Found`}
          </div>
          <button style={{ 
            background: 'transparent', 
            border: '1px solid rgba(0,0,0,0.1)', 
            color: 'var(--text-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            <Columns size={16} color="#8b5cf6" /> Show/Hide Columns
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <th style={{ padding: '16px', width: '40px' }}>
                  <input type="checkbox" style={{ borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }} disabled />
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Logo</th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Name <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Industry <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Phone <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Email <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Country <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Status <Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
                <th style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Last Communication Date <ArrowUpDown size={12} style={{ opacity: 0.5 }} /><Filter size={12} style={{ opacity: 0.5 }} /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No vendors found. Click "+ Add Vendor" to add one manually.
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr 
                    key={vendor.id} 
                    className="table-row-hover"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).tagName !== 'INPUT') {
                        navigate(`/vendors-suppliers/${vendor.id}`);
                      }
                    }}
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}
                  >
                    <td style={{ padding: '16px' }}>
                      <input type="checkbox" style={{ borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px' }}>
                        Logo
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>{vendor.name || vendor.businessName}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{vendor.industry || '-'}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{vendor.phone || '-'}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{vendor.email || '-'}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{vendor.country || '-'}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#dcfce7', color: '#166534', fontSize: '0.85rem', fontWeight: 500 }}>
                        Active
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                      -
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
