import { Categoria } from '../entities/Categoria';

export interface ICategoriasRepository {
  create(
    categoria: Omit<Categoria, 'createdAt' | 'updatedAt'>
  ): Promise<Categoria>;

  findById(id: string): Promise<Categoria | null>;

  findAll(): Promise<Categoria[]>;

  update(
    id: string,
    data: Partial<Omit<Categoria,
    'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Categoria | null>;

  softDelete(id: string): Promise<boolean>;
}