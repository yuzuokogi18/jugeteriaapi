import { Venta } from '../entities/Venta';
import { DetalleVenta } from '../entities/DetalleVenta';

export interface IVentasRepository {
  createVenta(
    venta: Omit<Venta, 'createdAt'>
  ): Promise<Venta>;

  createDetalle(
    detalle: DetalleVenta
  ): Promise<void>;
}