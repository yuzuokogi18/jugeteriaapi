import { v4 as uuidv4 } from 'uuid';

import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';

import { Producto } from '../../../domain/entities/Producto';

import {
  CreateProductoDto,
  UpdateProductoDto,
} from '../../dtos/producto.dto';

export class CreateProductoUseCase {

  constructor(
    private readonly productosRepo: IProductosRepository
  ) {}

  async execute(
    dto: CreateProductoDto
  ): Promise<Producto> {

    return this.productosRepo.create({
      id: uuidv4(),
      categoriaId: dto.categoriaId,
      nombre: dto.nombre,
      descripcion: dto.descripcion ?? null,
      precio: dto.precio,
      stock: dto.stock,
      edadRecomendada:
        dto.edadRecomendada ?? null,
      marca: dto.marca ?? null,
      imagenUrl: dto.imagenUrl ?? null,
      activo: true,
    });
  }
}

export class GetProductosUseCase {

  constructor(
    private readonly productosRepo: IProductosRepository
  ) {}

  async execute(): Promise<Producto[]> {
    return this.productosRepo.findAll();
  }
}

export class UpdateProductoUseCase {

  constructor(
    private readonly productosRepo: IProductosRepository
  ) {}

  async execute(
    id: string,
    dto: UpdateProductoDto
  ): Promise<Producto> {

    const producto =
      await this.productosRepo.findById(id);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const updated =
      await this.productosRepo.update(id, dto);

    if (!updated) {
      throw new Error('No se pudo actualizar');
    }

    return updated;
  }
}

export class DeleteProductoUseCase {

  constructor(
    private readonly productosRepo: IProductosRepository
  ) {}

  async execute(id: string): Promise<void> {

    const producto =
      await this.productosRepo.findById(id);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    await this.productosRepo.softDelete(id);
  }
}