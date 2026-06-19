import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import Invoices from './pages/Invoices';
import Quotations from './pages/Quotations';
import ProformaInvoices from './pages/ProformaInvoices';
import PaymentReceipts from './pages/PaymentReceipts';
import SalesOrders from './pages/SalesOrders';
import DeliveryChallans from './pages/DeliveryChallans';
import CreditNotes from './pages/CreditNotes';
import VendorLeads from './pages/VendorLeads';
import VendorsSuppliers from './pages/VendorsSuppliers';
import PayoutReceipts from './pages/PayoutReceipts';
import PurchaseOrders from './pages/PurchaseOrders';
import DebitNotes from './pages/DebitNotes';
import HireVendors from './pages/HireVendors';
import VATProfile from './pages/VATProfile';
import Expenses from './pages/Expenses';
import CRM from './pages/CRM';
import Accounting from './pages/Accounting';
import AccountGroups from './pages/AccountGroups';
import ChartOfAccounts from './pages/ChartOfAccounts';
import VoucherBooks from './pages/VoucherBooks';
import BalanceSheet from './pages/BalanceSheet';
import TrialBalance from './pages/TrialBalance';
import ProfitLoss from './pages/ProfitLoss';
import IncomeStatement from './pages/IncomeStatement';
import AllLedgers from './pages/AllLedgers';
import DayBook from './pages/DayBook';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="proforma-invoices" element={<ProformaInvoices />} />
          <Route path="payment-receipts" element={<PaymentReceipts />} />
          <Route path="sales-orders" element={<SalesOrders />} />
          <Route path="delivery-challans" element={<DeliveryChallans />} />
          <Route path="credit-notes" element={<CreditNotes />} />
          <Route path="vendor-leads" element={<VendorLeads />} />
          <Route path="vendors" element={<VendorsSuppliers />} />
          <Route path="payout-receipts" element={<PayoutReceipts />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="debit-notes" element={<DebitNotes />} />
          <Route path="hire-vendors" element={<HireVendors />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="pos" element={<POS />} />
          <Route path="vat-profile" element={<VATProfile />} />
          <Route path="purchases" element={<Expenses />} />
          <Route path="crm" element={<CRM />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="account-groups" element={<AccountGroups />} />
          <Route path="chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="voucher-books" element={<VoucherBooks />} />
          <Route path="balance-sheet" element={<BalanceSheet />} />
          <Route path="trial-balance" element={<TrialBalance />} />
          <Route path="profit-loss" element={<ProfitLoss />} />
          <Route path="income-statement" element={<IncomeStatement />} />
          <Route path="all-ledgers" element={<AllLedgers />} />
          <Route path="day-book" element={<DayBook />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
