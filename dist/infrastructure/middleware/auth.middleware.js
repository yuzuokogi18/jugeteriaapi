"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = void 0;
const authService_1 = require("../../domain/services/authService");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader ||
        !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            error: 'Token no proporcionado',
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        req.user = (0, authService_1.verifyToken)(token);
        next();
    }
    catch {
        res.status(401).json({
            error: 'Token inválido',
        });
    }
};
exports.authenticate = authenticate;
const requireRole = (...roles) => (req, res, next) => {
    if (!req.user ||
        !roles.includes(req.user.role)) {
        res.status(403).json({
            error: 'No tienes permisos',
        });
        return;
    }
    next();
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map