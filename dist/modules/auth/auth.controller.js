"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.register = async (req, res, next) => {
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
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const token = await this.authService.login(email, password);
                res.status(200).json({
                    message: 'Login successful',
                    data: { token },
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
