"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const auth_middleware_1 = require("../../infrastructure/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', (0, auth_middleware_1.requireRole)('admin', 'empleado'), clientes_controller_1.getClientes);
router.post('/', (0, auth_middleware_1.requireRole)('admin', 'empleado'), clientes_controller_1.createCliente);
exports.default = router;
//# sourceMappingURL=clientes.routes.js.map