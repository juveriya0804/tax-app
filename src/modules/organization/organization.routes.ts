import { Router } from 'express';
import { OrganizationController } from './organization.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new OrganizationController();

router.use(authMiddleware);

router.get('/profile', controller.getProfile);
router.put('/profile', controller.updateProfile);

export default router;
