"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLVentasRepository = void 0;
const mysql_1 = __importDefault(require("../../database/mysql"));
class MySQLVentasRepository {
    async createVenta(venta) {
        await mysql_1.default.query(`INSERT INTO ventas
      (
        id,
        cliente_id,
        user_id,
        total,
        metodo_pago,
        estado
      )
      VALUES (?, ?, ?, ?, ?, ?)`, [
            venta.id,
            venta.clienteId,
            venta.userId,
            venta.total,
            venta.metodoPago,
            venta.estado,
        ]);
        return {
            ...venta,
            createdAt: new Date(),
        };
    }
    async createDetalle(detalle) {
        await mysql_1.default.query(`INSERT INTO detalle_venta
      (
        id,
        venta_id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal
      )
      VALUES (?, ?, ?, ?, ?, ?)`, [
            detalle.id,
            detalle.ventaId,
            detalle.productoId,
            detalle.cantidad,
            detalle.precioUnitario,
            detalle.subtotal,
        ]);
    }
}
exports.MySQLVentasRepository = MySQLVentasRepository;
//# sourceMappingURL=MySQLVentasRepository.js.map