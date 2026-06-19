import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

// Extend Express Request to include our custom user payload
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organizationId: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the JWT token
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; organizationId: string };

    // Attach decoded user payload to the request
    req.user = {
      id: payload.id,
      organizationId: payload.organizationId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Token is invalid or expired' });
  }
};
