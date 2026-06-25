import { Request, Response } from 'express';
import * as creditNotesService from './credit-notes.service';

export const createCreditNote = async (req: Request, res: Response) => {
  try {
    const creditNote = await creditNotesService.createCreditNote(req.user!.organizationId, req.body);
    res.status(201).json(creditNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCreditNotes = async (req: Request, res: Response) => {
  try {
    const creditNotes = await creditNotesService.getCreditNotes(req.user!.organizationId);
    res.json(creditNotes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
