"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
        }
        const token = authHeader.split(' ')[1];
        // Verify the JWT token
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Attach decoded user payload to the request
        req.user = {
            id: payload.id,
            organizationId: payload.organizationId,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized: Token is invalid or expired' });
    }
};
exports.authMiddleware = authMiddleware;
