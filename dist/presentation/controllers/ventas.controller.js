"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVenta = void 0;
const VentasUseCases_1 = require("../../application/use-case/ventas/VentasUseCases");
const MySQLVentasRepository_1 = require("../../infrastructure/repositories/ventas/MySQLVentasRepository");
const MySQLProductosRepository_1 = require("../../infrastructure/repositories/productos/MySQLProductosRepository");
const ventasRepo = new MySQLVentasRepository_1.MySQLVentasRepository();
const productosRepo = new MySQLProductosRepository_1.MySQLProductosRepository();
const createUC = new VentasUseCases_1.CreateVentaUseCase(ventasRepo, productosRepo);
const createVenta = async (req, res) => {
    try {
        const venta = await createUC.execute(req.body, req.user.sub);
        res.status(201).json(venta);
    }
    catch (err) {
        const msg = err instanceof Error
            ? err.message
            : 'Error';
        res.status(400).json({
            error: msg,
        });
    }
};
exports.createVenta = createVenta;
//# sourceMappingURL=ventas.controller.js.map