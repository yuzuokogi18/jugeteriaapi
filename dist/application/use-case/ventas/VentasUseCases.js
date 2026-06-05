"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVentaUseCase = void 0;
const uuid_1 = require("uuid");
class CreateVentaUseCase {
    constructor(ventasRepo, productosRepo) {
        this.ventasRepo = ventasRepo;
        this.productosRepo = productosRepo;
    }
    async execute(dto, userId) {
        let total = 0;
        const productos = await this.productosRepo.findAll();
        for (const item of dto.productos) {
            const producto = productos.find(p => p.id === item.productoId);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            if (producto.stock < item.cantidad) {
                throw new Error(`Stock insuficiente para ${producto.nombre}`);
            }
            total += producto.precio * item.cantidad;
        }
        const venta = await this.ventasRepo.createVenta({
            id: (0, uuid_1.v4)(),
            clienteId: dto.clienteId ?? null,
            userId,
            total,
            metodoPago: dto.metodoPago,
            estado: 'completada',
        });
        for (const item of dto.productos) {
            const producto = productos.find(p => p.id === item.productoId);
            await this.ventasRepo.createDetalle({
                id: (0, uuid_1.v4)(),
                ventaId: venta.id,
                productoId: producto.id,
                cantidad: item.cantidad,
                precioUnitario: producto.precio,
                subtotal: producto.precio * item.cantidad,
            });
            await this.productosRepo.updateStock(producto.id, producto.stock - item.cantidad);
        }
        return venta;
    }
}
exports.CreateVentaUseCase = CreateVentaUseCase;
//# sourceMappingURL=VentasUseCases.js.map