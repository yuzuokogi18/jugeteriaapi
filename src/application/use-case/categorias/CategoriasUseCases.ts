import { v4 as uuidv4 } from 'uuid';

import { ICategoriasRepository } from '../../../domain/repositories/ICategoriasRepository';

import { Categoria } from '../../../domain/entities/Categoria';

import {
  CreateCategoriaDto,
  UpdateCategoriaDto,
} from '../../dtos/categoria.dto';

export class CreateCategoriaUseCase {

  constructor(
    private readonly categoriasRepo: ICategoriasRepository
  ) {}

  async execute(
    dto: CreateCategoriaDto
  ): Promise<Categoria> {

    return this.categoriasRepo.create({
      id: uuidv4(),
      nombre: dto.nombre,
      descripcion: dto.descripcion ?? null,
      activa: true,
    });
  }
}

export class GetCategoriasUseCase {

  constructor(
    private readonly categoriasRepo: ICategoriasRepository
  ) {}

  async execute(): Promise<Categoria[]> {
    return this.categoriasRepo.findAll();
  }
}

export class UpdateCategoriaUseCase {

  constructor(
    private readonly categoriasRepo: ICategoriasRepository
  ) {}

  async execute(
    id: string,
    dto: UpdateCategoriaDto
  ): Promise<Categoria> {

    const categoria =
      await this.categoriasRepo.findById(id);

    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }

    const updated =
      await this.categoriasRepo.update(id, dto);

    if (!updated) {
      throw new Error('No se pudo actualizar');
    }

    return updated;
  }
}

export class DeleteCategoriaUseCase {

  constructor(
    private readonly categoriasRepo: ICategoriasRepository
  ) {}

  async execute(id: string): Promise<void> {

    const categoria =
      await this.categoriasRepo.findById(id);

    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }

    await this.categoriasRepo.softDelete(id);
  }
}