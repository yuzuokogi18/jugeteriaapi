"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const RegisterUseCase_1 = require("../../application/use-case/auth/RegisterUseCase");
const LoginUseCase_1 = require("../../application/use-case/auth/LoginUseCase");
const GetMeUseCase_1 = require("../../application/use-case/auth/GetMeUseCase");
const MySQLAuthRepository_1 = require("../../infrastructure/repositories/auth/MySQLAuthRepository");
const authRepo = new MySQLAuthRepository_1.MySQLAuthRepository();
const registerUC = new RegisterUseCase_1.RegisterUseCase(authRepo);
const loginUC = new LoginUseCase_1.LoginUseCase(authRepo);
const getMeUC = new GetMeUseCase_1.GetMeUseCase(authRepo);
const register = async (req, res) => {
    try {
        const result = await registerUC.execute(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error al registrar';
        res.status(400).json({
            error: msg,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = await loginUC.execute(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error login';
        res.status(401).json({
            error: msg,
        });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await getMeUC.execute(req.user.sub);
        res.status(200).json(user);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error';
        res.status(404).json({
            error: msg,
        });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.controller.js.map