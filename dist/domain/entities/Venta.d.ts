export type MetodoPago = 'efectivo' | 'tarjeta' | 'transferencia';
export type EstadoVenta = 'completada' | 'cancelada';
export interface Venta {
    id: string;
    clienteId: string | null;
    userId: string;
    total: number;
    metodoPago: MetodoPago;
    estado: EstadoVenta;
    createdAt: Date;
}
//# sourceMappingURL=Venta.d.ts.map