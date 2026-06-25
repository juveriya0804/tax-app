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
  Workflow,
  Landmark,
  ClipboardList,
  Users,
  Plug,
  Award,
  Briefcase,
  Rocket,
  Menu,
  Zap,
  Gift,
  Bot,
  Headphones,
  Bell,
  Triangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedNav, setExpandedNav] = useState<string[]>([]);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  const toggleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedNav(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Gauge },
    { path: '/customers', label: 'Contacts', icon: User, badge: 'New' },
    { 
      path: '/invoices-menu', 
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
      path: '/purchases-menu', 
      label: 'Purchases & Expenses', 
      icon: ShoppingCart,
      subLinks: [
        { path: '/vendor-leads', label: 'Vendor Leads' },
        { path: '/vendors-suppliers', label: 'Vendors & Suppliers' },
        { path: '/purchases', label: 'Purchases & Expenses' },
        { path: '/payout-receipts', label: 'Payout Receipts' },
        { path: '/purchase-orders', label: 'Purchase Orders' },
        { path: '/debit-notes', label: 'Debit Notes' },
        { path: '/hire-vendors', label: 'Hire The Best Vendors' }
      ]
    },
    { 
      path: '/accounting-menu', 
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
        { path: '/all-ledgers', label: 'All Ledgers', badge: 'New' },
        { path: '/day-book', label: 'Day Book' }
      ]
    },
    { 
      path: '/crm-menu', 
      label: 'Sales CRM & Leads', 
      icon: MonitorCheck,
      subLinks: [
        { path: '/all-pipelines', label: 'All Pipelines' },
        { path: '/forms', label: 'Forms' },
        { path: '/all-leads', label: 'All Leads' },
        { path: '/all-meetings', label: 'All Meetings' },
        { path: '/leads-summary', label: 'Leads Summary' },
        { path: '/team-sales-report', label: 'Team Sales Report' },
        { path: '/client-performance-report', label: 'Client Performance Report' },
        { path: '/lead-source-report', label: 'Lead Source Report' }
      ]
    },
    { path: '/inventory', label: 'Products & Inventory', icon: Package },
    { path: '/pos', label: 'Point of Sale', icon: Store },
    { 
      path: '/banking-menu', 
      label: 'Banking & Payments', 
      icon: Landmark,
      subLinks: [
        { path: '/payment-accounts', label: 'Payment Accounts' },
        { path: '/bank-accounts', label: 'Bank Accounts' },
        { path: '/employee-accounts', label: 'Employee Accounts' },
        { path: '/bank-reconciliation', label: 'Bank Reconciliation' }
      ]
    },
    { 
      path: '/team-menu', 
      label: 'Manage Team', 
      icon: Users, 
      badge: 'New',
      subLinks: [
        { path: '/manage-users', label: 'Manage Users' },
        { path: '/manage-team-roles', label: 'Manage Team Roles' }
      ]
    },
    { 
      path: '/settings-menu', 
      label: 'Business Settings', 
      icon: Settings,
      subLinks: [
        { path: '/settings/general', label: 'General Settings' },
        { path: '/settings/users', label: 'All Users' },
        { path: '/settings/roles', label: 'Roles & Permissions' },
        { path: '/settings/accounting', label: 'Accounting' }
      ]
    },
    { path: '/vat-profile', label: 'VAT Profile', icon: Briefcase, badge: 'New' },
    { path: '/growth', label: 'Growth Suite', icon: Rocket },
  ];

  return (
    <div>
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <button className="nav-icon-btn" onClick={() => setIsSidebarPinned(!isSidebarPinned)}>
            <Menu size={24} />
          </button>
          <div className="nav-brand">
            <Triangle size={24} fill="white" />
            Refrens
          </div>
          <Link to="/user-profile/edit" style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '4px 12px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            marginLeft: '16px',
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samir" 
              alt="Profile" 
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
            Meet Samir Lalani
            <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>Your Onboarding manager</span>
          </Link>
        </div>
        <div className="nav-right">
          <button className="nav-icon-btn" style={{ position: 'relative' }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '0px',
              right: '2px',
              background: '#ef4444',
              color: 'white',
              fontSize: '0.6rem',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>2</span>
          </button>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" 
                alt="User" 
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}
              />
            </button>
            
            {isProfileMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                width: '180px',
                overflow: 'hidden',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Link 
                  to="/user-profile/view" 
                  onClick={() => setIsProfileMenuOpen(false)}
                  style={{ padding: '12px 16px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                >
                  View Profile
                </Link>
                <Link 
                  to="/user-profile/edit" 
                  onClick={() => setIsProfileMenuOpen(false)}
                  style={{ padding: '12px 16px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
                >
                  Edit Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    padding: '12px 16px', 
                    color: 'var(--danger)', 
                    background: 'none', 
                    border: 'none', 
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`refrens-sidebar ${isSidebarPinned ? 'pinned' : ''}`}>
        <Link to="/" style={{ marginBottom: '16px', alignSelf: 'flex-start', marginLeft: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid var(--accent-main)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-main)',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            N
          </div>
        </Link>
        <div className="refrens-sidebar-content">
          {navLinks.map((link) => {
            const hasSubLinks = !!link.subLinks;
            const isSubMenuExpanded = expandedNav.includes(link.path);
            
            // Check if active
            let isActive = false;
            if (hasSubLinks) {
              isActive = link.subLinks!.some(sub => location.pathname === sub.path);
            } else {
              isActive = location.pathname === link.path;
            }

            const Icon = link.icon;
            return (
              <div key={link.path} className="sidebar-item">
                <Link
                  to={hasSubLinks ? '#' : link.path}
                  onClick={(e) => {
                    if (hasSubLinks) {
                      toggleNav(link.path, e);
                    }
                  }}
                  className={`sidebar-icon ${isActive ? 'active' : ''}`}
                  title={link.label}
                >
                  <div className="sidebar-icon-inner">
                    <Icon size={20} />
                  </div>
                  <div className="sidebar-label">
                    <span>{link.label}</span>
                    {hasSubLinks && (
                      isSubMenuExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </Link>

                {hasSubLinks && (
                  <div className={`sidebar-submenus ${isSubMenuExpanded ? 'expanded' : ''}`}>
                    {link.subLinks!.map(sub => (
                      <Link 
                        key={sub.path} 
                        to={sub.path}
                        className={`sidebar-sublink ${location.pathname === sub.path ? 'active' : ''}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`refrens-main ${isSidebarPinned ? 'shifted' : ''}`}>
        <Outlet />
      </div>

      {/* Floating Action Button */}
      <button className="fab-chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path>
        </svg>
      </button>
    </div>
  );
}
