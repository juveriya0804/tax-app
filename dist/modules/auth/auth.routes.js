"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
// Registration endpoint
router.post('/register', authController.register);
// Login endpoint
router.post('/login', authController.login);
exports.default = router;
