import { v4 as uuidv4 } from 'uuid';

import { IVentasRepository } from '../../../domain/repositories/IVentasRepository';

import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';

import { Venta } from '../../../domain/entities/Venta';

import { CreateVentaDto } from '../../dtos/venta.dto';

export class CreateVentaUseCase {

  constructor(
    private readonly ventasRepo: IVentasRepository,
    private readonly productosRepo: IProductosRepository
  ) {}

  async execute(
    dto: CreateVentaDto,
    userId: string
  ): Promise<Venta> {

    let total = 0;

    const productos =
      await this.productosRepo.findAll();

    for (const item of dto.productos) {

      const producto = productos.find(
        p => p.id === item.productoId
      );

      if (!producto) {
        throw new Error('Producto no encontrado');
      }

      if (producto.stock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para ${producto.nombre}`
        );
      }

      total += producto.precio * item.cantidad;
    }

    const venta =
      await this.ventasRepo.createVenta({
        id: uuidv4(),
        clienteId: dto.clienteId ?? null,
        userId,
        total,
        metodoPago: dto.metodoPago,
        estado: 'completada',
      });

    for (const item of dto.productos) {

      const producto = productos.find(
        p => p.id === item.productoId
      )!;

      await this.ventasRepo.createDetalle({
        id: uuidv4(),
        ventaId: venta.id,
        productoId: producto.id,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
        subtotal:
          producto.precio * item.cantidad,
      });

      await this.productosRepo.updateStock(
        producto.id,
        producto.stock - item.cantidad
      );
    }

    return venta;
  }
}