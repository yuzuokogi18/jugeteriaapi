import { Cliente } from '../entities/Cliente';

export interface IClientesRepository {
  create(
    cliente: Omit<Cliente, 'createdAt' | 'updatedAt'>
  ): Promise<Cliente>;

  findById(id: string): Promise<Cliente | null>;

  findAll(): Promise<Cliente[]>;
}