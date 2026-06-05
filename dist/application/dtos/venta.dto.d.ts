export interface CreateDetalleVentaDto {
    productoId: string;
    cantidad: number;
}
export interface CreateVentaDto {
    clienteId?: string;
    metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
    productos: CreateDetalleVentaDto[];
}
//# sourceMappingURL=venta.dto.d.ts.map