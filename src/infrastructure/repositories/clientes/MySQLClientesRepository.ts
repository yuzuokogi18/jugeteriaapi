import {
  RowDataPacket,
  ResultSetHeader,
} from 'mysql2';

import pool from '../../database/mysql';

import { Cliente } from '../../../domain/entities/Cliente';

import { IClientesRepository } from '../../../domain/repositories/IClientesRepository';

interface ClienteRow
  extends RowDataPacket {

  id: string;

  nombre: string;

  apellido: string;

  telefono: string | null;

  email: string | null;

  direccion: string | null;

  activo: number;

  created_at: Date;

  updated_at: Date;
}

const toCliente =
  (row: ClienteRow): Cliente => ({

    id: row.id,

    nombre: row.nombre,

    apellido: row.apellido,

    telefono: row.telefono,

    email: row.email,

    direccion: row.direccion,

    activo: row.activo === 1,

    createdAt: row.created_at,

    updatedAt: row.updated_at,
  });

export class MySQLClientesRepository
  implements IClientesRepository {

  async create(
    cliente:
    Omit<Cliente,
    'createdAt' | 'updatedAt'>
  ): Promise<Cliente> {

    await pool.query<ResultSetHeader>(
      `INSERT INTO clientes
      (
        id,
        nombre,
        apellido,
        telefono,
        email,
        direccion,
        activo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente.id,
        cliente.nombre,
        cliente.apellido,
        cliente.telefono,
        cliente.email,
        cliente.direccion,
        cliente.activo ? 1 : 0,
      ]
    );

    const created =
      await this.findById(cliente.id);

    if (!created) {
      throw new Error(
        'Error al crear cliente'
      );
    }

    return created;
  }

  async findById(
    id: string
  ): Promise<Cliente | null> {

    const [rows] =
      await pool.query<ClienteRow[]>(

        `SELECT *
         FROM clientes
         WHERE id = ?
         LIMIT 1`,

        [id]
      );

    return rows[0]
      ? toCliente(rows[0])
      : null;
  }

  async findAll(): Promise<Cliente[]> {

    const [rows] =
      await pool.query<ClienteRow[]>(

        `SELECT *
         FROM clientes
         WHERE activo = 1
         ORDER BY nombre`
      );

    return rows.map(toCliente);
  }
}