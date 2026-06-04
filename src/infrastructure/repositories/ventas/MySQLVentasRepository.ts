import {
  ResultSetHeader,
} from 'mysql2';

import pool from '../../database/mysql';

import { Venta } from '../../../domain/entities/Venta';

import { DetalleVenta } from '../../../domain/entities/DetalleVenta';

import { IVentasRepository } from '../../../domain/repositories/IVentasRepository';

export class MySQLVentasRepository
  implements IVentasRepository {

  async createVenta(
    venta: Omit<Venta, 'createdAt'>
  ): Promise<Venta> {

    await pool.query<ResultSetHeader>(
      `INSERT INTO ventas
      (
        id,
        cliente_id,
        user_id,
        total,
        metodo_pago,
        estado
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        venta.id,
        venta.clienteId,
        venta.userId,
        venta.total,
        venta.metodoPago,
        venta.estado,
      ]
    );

    return {
      ...venta,
      createdAt: new Date(),
    };
  }

  async createDetalle(
    detalle: DetalleVenta
  ): Promise<void> {

    await pool.query<ResultSetHeader>(
      `INSERT INTO detalle_venta
      (
        id,
        venta_id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        detalle.id,
        detalle.ventaId,
        detalle.productoId,
        detalle.cantidad,
        detalle.precioUnitario,
        detalle.subtotal,
      ]
    );
  }
}