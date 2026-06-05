import { Venta } from '../../../domain/entities/Venta';
import { DetalleVenta } from '../../../domain/entities/DetalleVenta';
import { IVentasRepository } from '../../../domain/repositories/IVentasRepository';
export declare class MySQLVentasRepository implements IVentasRepository {
    createVenta(venta: Omit<Venta, 'createdAt'>): Promise<Venta>;
    createDetalle(detalle: DetalleVenta): Promise<void>;
}
//# sourceMappingURL=MySQLVentasRepository.d.ts.map