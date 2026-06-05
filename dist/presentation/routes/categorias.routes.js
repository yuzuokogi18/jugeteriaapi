"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias_controller_1 = require("../controllers/categorias.controller");
const auth_middleware_1 = require("../../infrastructure/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', categorias_controller_1.getCategorias);
router.post('/', (0, auth_middleware_1.requireRole)('admin'), categorias_controller_1.createCategoria);
router.put('/:id', (0, auth_middleware_1.requireRole)('admin'), categorias_controller_1.updateCategoria);
router.delete('/:id', (0, auth_middleware_1.requireRole)('admin'), categorias_controller_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categorias.routes.js.map