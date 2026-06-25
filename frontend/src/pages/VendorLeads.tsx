import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, fetchApi } from '../services/api';
import { ChevronDown, Download, Plus, Columns, Filter } from 'lucide-react';
import VendorLeadModal from '../components/VendorLeadModal';
import toast from 'react-hot-toast';

export default function VendorLeads() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('vendorLeads') || '[]');
    setLeads(saved);
  }, [navigate]);

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Nafter &gt; <span style={{ color: 'var(--text-primary)' }}>Vendor Leads Dashboard</span> &gt;
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Your Vendor Leads <span style={{ fontSize: '1.2rem' }}>💡</span>
          </h1>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ 
                background: '#e11d48',
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '6px', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)'
              }}
            >
              <Plus size={18} /> Create Vendor Leads <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: '200px',
                zIndex: 10,
                overflow: 'hidden'
              }}>
                <div 
                  onClick={() => { setDropdownOpen(false); navigate('/vendor-leads/create'); }}
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 500 }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  Add Lead Manually
                </div>
                <div 
                  onClick={() => { setDropdownOpen(false); alert('Import feature coming soon!'); }}
                  style={{ padding: '12px 16px', cursor: 'pointer', fontWeight: 500 }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  Import from CSV
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        {/* Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Download size={16} /> Download CSV
          </button>
        </div>

        {/* Table Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            No vendor lead Found
          </div>
          <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '0.9rem' }}>
            <Columns size={16} color="var(--accent-primary)" /> Show/Hide Columns
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <th style={{ padding: '16px', width: '40px' }}>
                  <input type="checkbox" style={{ borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }} disabled />
                </th>
                {['Name', 'Phone', 'Email', 'Country', 'Workflow Name', 'Current Assignee', 'Current Stage', 'Current Status'].map((col) => (
                  <th key={col} style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {col} <Filter size={12} style={{ opacity: 0.5 }} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No vendor leads found. Click "+ Create Vendor Leads" to add one manually.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '16px' }}><input type="checkbox" style={{ borderRadius: '4px', border: '1px solid rgba(0,0,0,0.2)' }} /></td>
                    <td style={{ padding: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>{lead.name}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{lead.phone}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{lead.email || '-'}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{lead.country || '-'}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{lead.workflowName}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{lead.currentAssignee}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#e0e7ff', color: '#4f46e5', fontSize: '0.85rem', fontWeight: 500 }}>
                        {lead.currentStage}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#dcfce7', color: '#166534', fontSize: '0.85rem', fontWeight: 500 }}>
                        {lead.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <VendorLeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={(newLead) => {
          setIsModalOpen(false);
          setLeads([...leads, newLead]);
        }}
      />
    </div>
  );
}
