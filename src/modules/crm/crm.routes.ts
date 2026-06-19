import { Router } from 'express';
import { CrmController } from './crm.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const crmController = new CrmController();

router.use(authMiddleware);

router.get('/leads', crmController.getLeads);
router.post('/leads', crmController.createLead);
router.put('/leads/:leadId/status', crmController.updateLeadStatus);

export default router;
