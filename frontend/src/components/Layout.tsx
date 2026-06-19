import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { removeAuthToken } from '../services/api';
import { 
  Gauge, 
  User, 
  ReceiptText, 
  ShoppingCart, 
  BookOpen, 
  MonitorCheck, 
  Package,
  Store,
  Settings,
  LogOut,
  Workflow,
  Landmark,
  ClipboardList,
  Users,
  Plug,
  Award,
  Briefcase,
  Rocket,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedNav, setExpandedNav] = useState<string[]>(['/invoices']);

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  const toggleNav = (path: string) => {
    setExpandedNav(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Gauge },
    { path: '/customers', label: 'Contacts', icon: User, badge: 'New' },
    { 
      path: '/invoices', 
      label: 'Sales & Invoices', 
      icon: ReceiptText,
      subLinks: [
        { path: '/customers', label: 'Clients & Prospects' },
        { path: '/quotations', label: 'Quotation & Estimates' },
        { path: '/proforma-invoices', label: 'Proforma Invoices' },
        { path: '/invoices', label: 'Invoices' },
        { path: '/payment-receipts', label: 'Payment Receipts' },
        { path: '/sales-orders', label: 'Sales Orders' },
        { path: '/delivery-challans', label: 'Delivery Challans' },
        { path: '/credit-notes', label: 'Credit Notes' }
      ]
    },
    { 
      path: '/purchases', 
      label: 'Purchases & Expenses', 
      icon: ShoppingCart,
      subLinks: [
        { path: '/vendor-leads', label: 'Vendor Leads' },
        { path: '/vendors', label: 'Vendors & Suppliers' },
        { path: '/purchases', label: 'Purchases & Expenses' },
        { path: '/payout-receipts', label: 'Payout Receipts' },
        { path: '/purchase-orders', label: 'Purchase Orders' },
        { path: '/debit-notes', label: 'Debit Notes' },
        { path: '/hire-vendors', label: 'Hire The Best Vendors' }
      ]
    },
    { 
      path: '/accounting', 
      label: 'Accounting', 
      icon: BookOpen,
      subLinks: [
        { path: '/account-groups', label: 'Account Groups' },
        { path: '/chart-of-accounts', label: 'Chart of Accounts' },
        { path: '/voucher-books', label: 'Voucher Books' },
        { path: '/balance-sheet', label: 'Balance Sheet' },
        { path: '/trial-balance', label: 'Trial Balance' },
        { path: '/profit-loss', label: 'Profit & Loss' },
        { path: '/income-statement', label: 'Income Statement' },
        { path: '/all-ledgers', label: 'All Ledgers Master R...', badge: 'New' },
        { path: '/day-book', label: 'Day Book' }
      ]
    },
    { path: '/crm', label: 'Sales CRM & Leads', icon: MonitorCheck },
    { path: '/inventory', label: 'Products & Inventory', icon: Package },
    { path: '#workflows', label: 'Workflows & Automations', icon: Workflow },
    { path: '#banking', label: 'Banking & Payments', icon: Landmark },
    { path: '#payroll', label: 'Payroll & HRMS', icon: ClipboardList },
    { path: '#team', label: 'Manage Team', icon: Users, badge: 'New' },
    { path: '#settings', label: 'Business Settings', icon: Settings },
    { path: '#integrations', label: 'Integrations', icon: Plug },
    { path: '#greetings', label: 'Greetings', icon: Award },
    { path: '/vat-profile', label: 'Profile', icon: Briefcase, badge: 'New' },
    { path: '#growth', label: 'Growth Suite', icon: Rocket },
    { path: '/pos', label: 'Point of Sale', icon: Store },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <div className="glass-panel" style={{ 
        width: '280px', 
        padding: '30px 16px', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: 0,
        margin: 0,
        background: '#ffffff'
      }}>
        <h2 className="text-gradient" style={{ marginBottom: '32px', fontSize: '1.5rem', textAlign: 'center' }}>Tax Flow</h2>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.subLinks && link.subLinks.some(sub => location.pathname === sub.path));
            const isExpanded = expandedNav.includes(link.path);
            const Icon = link.icon;
            
            return (
              <div key={link.path + link.label}>
                {link.subLinks ? (
                  <div
                    onClick={() => toggleNav(link.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      color: isActive ? '#ffffff' : '#334155',
                      background: isActive ? 'var(--accent-primary)' : 'transparent',
                      transition: 'all 0.3s ease',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '1.05rem'
                    }}
                  >
                    <Icon size={22} style={{ marginRight: '16px', opacity: isActive ? 1 : 0.8 }} />
                    <span style={{ flex: 1 }}>{link.label}</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: isActive ? '#ffffff' : '#334155',
                      background: isActive ? 'var(--accent-primary)' : 'transparent',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '1.05rem'
                    }}
                  >
                    <Icon size={22} style={{ marginRight: '16px', opacity: isActive ? 1 : 0.8 }} />
                    <span style={{ flex: 1 }}>{link.label}</span>
                    {link.badge && (
                      <span style={{
                        color: '#E11D48',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginLeft: '8px'
                      }}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )}

                {link.subLinks && isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px', marginLeft: '38px' }}>
                    {link.subLinks.map(subLink => {
                      const isSubActive = location.pathname === subLink.path;
                      return (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: isSubActive ? 'var(--accent-primary)' : '#475569',
                            background: isSubActive ? '#f8fafc' : 'transparent',
                            fontWeight: isSubActive ? 600 : 500,
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span>{subLink.label}</span>
                          {subLink.badge && (
                            <span style={{
                              color: '#E11D48',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              background: '#ffe4e6',
                              padding: '2px 6px',
                              borderRadius: '4px',
                            }}>
                              {subLink.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout} 
          style={{ 
            marginTop: 'auto', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#0F172A'}
          onMouseOut={(e) => e.currentTarget.style.color = '#64748B'}
        >
          <LogOut size={20} style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        <Outlet />
      </div>
    </div>
  );
}
