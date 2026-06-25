import { Router } from 'express';
import * as creditNotesController from './credit-notes.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', creditNotesController.createCreditNote);
router.get('/', creditNotesController.getCreditNotes);

export default router;
