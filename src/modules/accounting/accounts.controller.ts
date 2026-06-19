import { Request, Response } from 'express';
import * as accountsService from './accounts.service';

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await accountsService.getAccounts(req.user!.organizationId);
    res.json(accounts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  try {
    const account = await accountsService.getAccountById(req.user!.organizationId, req.params.id as string);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const account = await accountsService.createAccount(req.user!.organizationId, req.body);
    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    await accountsService.updateAccount(req.user!.organizationId, req.params.id as string, req.body);
    const account = await accountsService.getAccountById(req.user!.organizationId, req.params.id as string);
    res.json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    await accountsService.deleteAccount(req.user!.organizationId, req.params.id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
