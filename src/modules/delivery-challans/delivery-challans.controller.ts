import { Request, Response } from 'express';
import * as deliveryChallansService from './delivery-challans.service';

export const createChallan = async (req: Request, res: Response) => {
  try {
    const challan = await deliveryChallansService.createChallan(req.user!.organizationId, req.body);
    res.status(201).json(challan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getChallans = async (req: Request, res: Response) => {
  try {
    const challans = await deliveryChallansService.getChallans(req.user!.organizationId);
    res.json(challans);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
