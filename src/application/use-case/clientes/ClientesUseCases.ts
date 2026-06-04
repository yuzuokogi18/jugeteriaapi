import { v4 as uuidv4 } from 'uuid';

import { IClientesRepository } from '../../../domain/repositories/IClientesRepository';

import { Cliente } from '../../../domain/entities/Cliente';

import { CreateClienteDto } from '../../dtos/cliente.dto';

export class CreateClienteUseCase {

  constructor(
    private readonly clientesRepo: IClientesRepository
  ) {}

  async execute(
    dto: CreateClienteDto
  ): Promise<Cliente> {

    return this.clientesRepo.create({
      id: uuidv4(),
      nombre: dto.nombre,
      apellido: dto.apellido,
      telefono: dto.telefono ?? null,
      email: dto.email ?? null,
      direccion: dto.direccion ?? null,
      activo: true,
    });
  }
}

export class GetClientesUseCase {

  constructor(
    private readonly clientesRepo: IClientesRepository
  ) {}

  async execute(): Promise<Cliente[]> {
    return this.clientesRepo.findAll();
  }
}