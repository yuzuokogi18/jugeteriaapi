import {
  RowDataPacket,
  ResultSetHeader,
} from 'mysql2';

import pool from '../../database/mysql';

import { Categoria } from '../../../domain/entities/Categoria';

import { ICategoriasRepository } from '../../../domain/repositories/ICategoriasRepository';

interface CategoriaRow
  extends RowDataPacket {

  id: string;

  nombre: string;

  descripcion: string | null;

  activa: number;

  created_at: Date;

  updated_at: Date;
}

const toCategoria =
  (row: CategoriaRow): Categoria => ({

    id: row.id,

    nombre: row.nombre,

    descripcion: row.descripcion,

    activa: row.activa === 1,

    createdAt: row.created_at,

    updatedAt: row.updated_at,
  });

export class MySQLCategoriasRepository
  implements ICategoriasRepository {

  async create(
    categoria:
    Omit<Categoria,
    'createdAt' | 'updatedAt'>
  ): Promise<Categoria> {

    await pool.query<ResultSetHeader>(
      `INSERT INTO categorias
      (
        id,
        nombre,
        descripcion,
        activa
      )
      VALUES (?, ?, ?, ?)`,
      [
        categoria.id,
        categoria.nombre,
        categoria.descripcion,
        categoria.activa ? 1 : 0,
      ]
    );

    const created =
      await this.findById(categoria.id);

    if (!created) {
      throw new Error(
        'Error al crear categoría'
      );
    }

    return created;
  }

  async findById(
    id: string
  ): Promise<Categoria | null> {

    const [rows] =
      await pool.query<CategoriaRow[]>(

        `SELECT *
         FROM categorias
         WHERE id = ?
         LIMIT 1`,

        [id]
      );

    return rows[0]
      ? toCategoria(rows[0])
      : null;
  }

  async findAll(): Promise<Categoria[]> {

    const [rows] =
      await pool.query<CategoriaRow[]>(

        `SELECT *
         FROM categorias
         WHERE activa = 1
         ORDER BY nombre`
      );

    return rows.map(toCategoria);
  }

  async update(
    id: string,
    data: Partial<Categoria>
  ): Promise<Categoria | null> {

    const fields: string[] = [];

    const values: unknown[] = [];

    if (data.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(data.nombre);
    }

    if (
      data.descripcion !== undefined
    ) {
      fields.push('descripcion = ?');
      values.push(data.descripcion);
    }

    values.push(id);

    await pool.query<ResultSetHeader>(
      `UPDATE categorias
       SET ${fields.join(', ')}
       WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  async softDelete(
    id: string
  ): Promise<boolean> {

    const [result] =
      await pool.query<ResultSetHeader>(

        `UPDATE categorias
         SET activa = 0
         WHERE id = ?`,

        [id]
      );

    return result.affectedRows > 0;
  }
}