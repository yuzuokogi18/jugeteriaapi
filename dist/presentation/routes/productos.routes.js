"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_controller_1 = require("../controllers/productos.controller");
const auth_middleware_1 = require("../../infrastructure/middleware/auth.middleware");
const productoImageUpload_1 = require("../../infrastructure/middleware/productoImageUpload");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', productos_controller_1.getProductos);
router.post('/', (0, auth_middleware_1.requireRole)('admin'), productoImageUpload_1.productoImageUpload.single('imagen'), productos_controller_1.createProducto);
router.put('/:id', (0, auth_middleware_1.requireRole)('admin'), productoImageUpload_1.productoImageUpload.single('imagen'), productos_controller_1.updateProducto);
router.delete('/:id', (0, auth_middleware_1.requireRole)('admin'), productos_controller_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=productos.routes.js.map