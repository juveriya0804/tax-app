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
import CreateQuotation from './pages/CreateQuotation';
import CreateInvoice from './pages/CreateInvoice';
import ViewInvoice from './pages/ViewInvoice';
import ViewQuotation from './pages/ViewQuotation';
import ProformaInvoices from './pages/ProformaInvoices';
import PaymentReceipts from './pages/PaymentReceipts';
import CreatePaymentReceipt from './pages/CreatePaymentReceipt';
import ViewPaymentReceipt from './pages/ViewPaymentReceipt';
import SalesOrders from './pages/SalesOrders';
import CreateSalesOrder from './pages/CreateSalesOrder';
import DeliveryChallans from './pages/DeliveryChallans';
import CreateDeliveryChallan from './pages/CreateDeliveryChallan';
import CreditNotes from './pages/CreditNotes';
import CreateCreditNote from './pages/CreateCreditNote';
import VendorLeads from './pages/VendorLeads';
import CreateVendorLead from './pages/CreateVendorLead';
import VendorsSuppliers from './pages/VendorsSuppliers';
import CreateVendorSupplier from './pages/CreateVendorSupplier';
import ViewVendorSupplier from './pages/ViewVendorSupplier';
import PayoutReceipts from './pages/PayoutReceipts';
import CreatePayoutReceipt from './pages/CreatePayoutReceipt';
import PurchaseOrders from './pages/PurchaseOrders';
import CreatePurchaseOrder from './pages/CreatePurchaseOrder';
import DebitNotes from './pages/DebitNotes';
import CreateDebitNote from './pages/CreateDebitNote';
import HireVendors from './pages/HireVendors';
import VATProfile from './pages/VATProfile';
import Expenses from './pages/Expenses';
import CreatePurchase from './pages/CreatePurchase';
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
import AllPipelines from './pages/AllPipelines';
import Forms from './pages/Forms';
import AllLeads from './pages/AllLeads';
import AllMeetings from './pages/AllMeetings';
import LeadsSummary from './pages/LeadsSummary';
import TeamSalesReport from './pages/TeamSalesReport';
import ClientPerformanceReport from './pages/ClientPerformanceReport';
import LeadSourceReport from './pages/LeadSourceReport';
import Workflows from './pages/Workflows';
import Banking from './pages/Banking';
import Payroll from './pages/Payroll';
import ManageTeam from './pages/ManageTeam';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import Greetings from './pages/Greetings';
import AllWorkflows from './pages/AllWorkflows';
import VendorWorkflows from './pages/VendorWorkflows';
import ExpenseWorkflows from './pages/ExpenseWorkflows';
import InvoiceWorkflows from './pages/InvoiceWorkflows';
import QuotationWorkflows from './pages/QuotationWorkflows';
import PurchaseOrderWorkflows from './pages/PurchaseOrderWorkflows';
import ProformaInvoiceWorkflows from './pages/ProformaInvoiceWorkflows';
import WorkflowForms from './pages/WorkflowForms';
import PaymentAccounts from './pages/PaymentAccounts';
import BankAccounts from './pages/BankAccounts';
import EmployeeAccounts from './pages/EmployeeAccounts';
import BankReconciliation from './pages/BankReconciliation';
import ManageUsers from './pages/ManageUsers';
import ManageTeamRoles from './pages/ManageTeamRoles';
import SettingsGeneral from './pages/SettingsGeneral';
import SettingsUsers from './pages/SettingsUsers';
import SettingsRoles from './pages/SettingsRoles';
import SettingsAccounting from './pages/SettingsAccounting';
import SettingsApproval from './pages/SettingsApproval';
import SettingsInventory from './pages/SettingsInventory';
import SettingsAdvancedAccounting from './pages/SettingsAdvancedAccounting';
import SettingsEmail from './pages/SettingsEmail';
import SettingsCRM from './pages/SettingsCRM';
import SettingsCustomFields from './pages/SettingsCustomFields';
import ViewProfile from './pages/ViewProfile';
import EditProfile from './pages/EditProfile';
import AddNewLead from './pages/AddNewLead';
import GrowthSuite from './pages/GrowthSuite';
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
          <Route path="invoices/create" element={<CreateInvoice />} />
          <Route path="invoices/:id" element={<ViewInvoice />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/create" element={<CreateQuotation />} />
          <Route path="quotations/:id" element={<ViewQuotation />} />
          <Route path="proforma-invoices" element={<ProformaInvoices />} />
          <Route path="payment-receipts" element={<PaymentReceipts />} />
          <Route path="payment-receipts/create" element={<CreatePaymentReceipt />} />
          <Route path="payment-receipts/:id" element={<ViewPaymentReceipt />} />
          <Route path="payments/create" element={<PaymentReceipts />} />
          <Route path="sales-orders" element={<SalesOrders />} />
          <Route path="sales-orders/create" element={<CreateSalesOrder />} />
          <Route path="delivery-challans" element={<DeliveryChallans />} />
          <Route path="delivery-challans/create" element={<CreateDeliveryChallan />} />
          <Route path="credit-notes" element={<CreditNotes />} />
          <Route path="credit-notes/create" element={<CreateCreditNote />} />
          <Route path="vendor-leads" element={<VendorLeads />} />
          <Route path="vendor-leads/create" element={<CreateVendorLead />} />
          <Route path="vendors-suppliers" element={<VendorsSuppliers />} />
          <Route path="vendors-suppliers/create" element={<CreateVendorSupplier />} />
          <Route path="vendors-suppliers/:id" element={<ViewVendorSupplier />} />
          <Route path="payout-receipts" element={<PayoutReceipts />} />
          <Route path="payout-receipts/create" element={<CreatePayoutReceipt />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="purchase-orders/create" element={<CreatePurchaseOrder />} />
          <Route path="debit-notes" element={<DebitNotes />} />
          <Route path="debit-notes/create" element={<CreateDebitNote />} />
          <Route path="hire-vendors" element={<HireVendors />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="pos" element={<POS />} />
          <Route path="vat-profile" element={<VATProfile />} />
          <Route path="growth" element={<GrowthSuite />} />
          <Route path="purchases" element={<Expenses />} />
          <Route path="purchases/create" element={<CreatePurchase />} />
          <Route path="customers" element={<Customers />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="all-pipelines" element={<AllPipelines />} />
          <Route path="forms" element={<Forms />} />
          <Route path="all-leads" element={<AllLeads />} />
          <Route path="leads/create" element={<AddNewLead />} />
          <Route path="all-meetings" element={<AllMeetings />} />
          <Route path="leads-summary" element={<LeadsSummary />} />
          <Route path="team-sales-report" element={<TeamSalesReport />} />
          <Route path="client-performance-report" element={<ClientPerformanceReport />} />
          <Route path="lead-source-report" element={<LeadSourceReport />} />
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
          <Route path="workflows" element={<Workflows />} />
          <Route path="all-workflows" element={<AllWorkflows />} />
          <Route path="vendor-workflows" element={<VendorWorkflows />} />
          <Route path="expense-workflows" element={<ExpenseWorkflows />} />
          <Route path="invoice-workflows" element={<InvoiceWorkflows />} />
          <Route path="quotation-workflows" element={<QuotationWorkflows />} />
          <Route path="purchase-order-workflows" element={<PurchaseOrderWorkflows />} />
          <Route path="proforma-invoice-workflows" element={<ProformaInvoiceWorkflows />} />
          <Route path="workflow-forms" element={<WorkflowForms />} />
          <Route path="banking" element={<Banking />} />
          <Route path="payment-accounts" element={<PaymentAccounts />} />
          <Route path="bank-accounts" element={<BankAccounts />} />
          <Route path="employee-accounts" element={<EmployeeAccounts />} />
          <Route path="bank-reconciliation" element={<BankReconciliation />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-team-roles" element={<ManageTeamRoles />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/general" element={<SettingsGeneral />} />
          <Route path="settings/users" element={<SettingsUsers />} />
          <Route path="settings/roles" element={<SettingsRoles />} />
          <Route path="settings/accounting" element={<SettingsAccounting />} />
          <Route path="settings/approval-workflows" element={<SettingsApproval />} />
          <Route path="settings/inventory" element={<SettingsInventory />} />
          <Route path="settings/advanced-accounting" element={<SettingsAdvancedAccounting />} />
          <Route path="settings/email" element={<SettingsEmail />} />
          <Route path="settings/crm" element={<SettingsCRM />} />
          <Route path="settings/custom-fields" element={<SettingsCustomFields />} />
          <Route path="user-profile/view" element={<ViewProfile />} />
          <Route path="user-profile/edit" element={<EditProfile />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="greetings" element={<Greetings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
