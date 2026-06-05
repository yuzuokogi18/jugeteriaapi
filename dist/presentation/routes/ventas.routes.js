"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventas_controller_1 = require("../controllers/ventas.controller");
const auth_middleware_1 = require("../../infrastructure/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/', (0, auth_middleware_1.requireRole)('admin', 'empleado'), ventas_controller_1.createVenta);
exports.default = router;
//# sourceMappingURL=ventas.routes.js.map