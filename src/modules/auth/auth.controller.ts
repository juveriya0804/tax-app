import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, companyName, jurisdiction, trn } = req.body;
      const user = await this.authService.register({
        email,
        password,
        companyName,
        jurisdiction,
        trn,
      });

      res.status(201).json({
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        data: { token },
      });
    } catch (error) {
      next(error);
    }
  };
}
