import { Request, Response } from 'express';
import * as quotationsService from './quotations.service';

export const createQuotation = async (req: Request, res: Response) => {
  try {
    const quotation = await quotationsService.createQuotation(req.user!.organizationId, req.body);
    res.status(201).json(quotation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuotations = async (req: Request, res: Response) => {
  try {
    const quotations = await quotationsService.getQuotations(req.user!.organizationId);
    res.json(quotations);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuotationById = async (req: Request, res: Response) => {
  try {
    const quotation = await quotationsService.getQuotationById(req.user!.organizationId, req.params.id as string);
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    res.json(quotation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateQuotation = async (req: Request, res: Response) => {
  try {
    const quotation = await quotationsService.updateQuotation(req.user!.organizationId, req.params.id as string, req.body);
    res.json(quotation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQuotation = async (req: Request, res: Response) => {
  try {
    await quotationsService.deleteQuotation(req.user!.organizationId, req.params.id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
