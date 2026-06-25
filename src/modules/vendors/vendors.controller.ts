import { Request, Response } from 'express';
import * as vendorsService from './vendors.service';

export const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await vendorsService.getVendors(req.user!.organizationId);
    res.json(vendors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVendorById = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorsService.getVendorById(req.user!.organizationId, req.params.id as string);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createVendor = async (req: Request, res: Response) => {
  try {
    const vendor = await vendorsService.createVendor(req.user!.organizationId, req.body);
    res.status(201).json(vendor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVendor = async (req: Request, res: Response) => {
  try {
    await vendorsService.updateVendor(req.user!.organizationId, req.params.id as string, req.body);
    const vendor = await vendorsService.getVendorById(req.user!.organizationId, req.params.id as string);
    res.json(vendor);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVendor = async (req: Request, res: Response) => {
  try {
    await vendorsService.deleteVendor(req.user!.organizationId, req.params.id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVendorLeads = async (req: Request, res: Response) => {
  try {
    const leads = await vendorsService.getVendorLeads(req.user!.organizationId);
    res.json({ data: leads });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createVendorLead = async (req: Request, res: Response) => {
  try {
    const lead = await vendorsService.createVendorLead(req.user!.organizationId, req.body);
    res.status(201).json({ data: lead });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVendorLead = async (req: Request, res: Response) => {
  try {
    await vendorsService.updateVendorLead(req.user!.organizationId, req.params.id as string, req.body);
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
