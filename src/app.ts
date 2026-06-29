import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import billingRoutes from './modules/billing/billing.routes';
import whatsappRoutes from './modules/whatsapp/whatsapp.routes';
import reportsRoutes from './modules/reports/reports.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';
import posRoutes from './modules/pos/pos.routes';
import organizationRoutes from './modules/organization/organization.routes';
import expensesRoutes from './modules/expenses/expenses.routes';
import crmRoutes from './modules/crm/crm.routes';
import accountingRoutes from './modules/accounting/accounting.routes';
import quotationsRoutes from './modules/quotations/quotations.routes';
import vendorsRoutes from './modules/vendors/vendors.routes';
import deliveryChallansRoutes from './modules/delivery-challans/delivery-challans.routes';
import creditNotesRoutes from './modules/credit-notes/credit-notes.routes';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/billing', billingRoutes);
apiRouter.use('/whatsapp', whatsappRoutes);
apiRouter.use('/reports', reportsRoutes);
apiRouter.use('/inventory', inventoryRoutes);
apiRouter.use('/pos', posRoutes);
apiRouter.use('/organization', organizationRoutes);
apiRouter.use('/expenses', expensesRoutes);
apiRouter.use('/crm', crmRoutes);
apiRouter.use('/accounting', accountingRoutes);
apiRouter.use('/quotations', quotationsRoutes);
apiRouter.use('/vendors', vendorsRoutes);
apiRouter.use('/delivery-challans', deliveryChallansRoutes);
apiRouter.use('/credit-notes', creditNotesRoutes);

app.use('/api', apiRouter);
// Mount on / as well to handle Netlify Serverless environment path stripping
app.use('/', apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
