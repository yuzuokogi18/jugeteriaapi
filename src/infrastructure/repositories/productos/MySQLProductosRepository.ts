import {
  RowDataPacket,
  ResultSetHeader,
} from 'mysql2';

import pool from '../../database/mysql';

import { Producto } from '../../../domain/entities/Producto';

import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';

interface ProductoRow
  extends RowDataPacket {

  id: string;

  categoria_id: string;

  nombre: string;

  descripcion: string | null;

  precio: number;

  stock: number;

  edad_recomendada: string | null;

  marca: string | null;

  imagen_url: string | null;

  activo: number;

  created_at: Date;

  updated_at: Date;
}

const toProducto =
  (row: ProductoRow): Producto => ({

    id: row.id,

    categoriaId: row.categoria_id,

    nombre: row.nombre,

    descripcion: row.descripcion,

    precio: Number(row.precio),

    stock: row.stock,

    edadRecomendada:
      row.edad_recomendada,

    marca: row.marca,

    imagenUrl: row.imagen_url,

    activo: row.activo === 1,

    createdAt: row.created_at,

    updatedAt: row.updated_at,
  });

export class MySQLProductosRepository
  implements IProductosRepository {

  async create(
    producto:
    Omit<Producto,
    'createdAt' | 'updatedAt'>
  ): Promise<Producto> {

    await pool.query<ResultSetHeader>(
      `INSERT INTO productos
      (
        id,
        categoria_id,
        nombre,
        descripcion,
        precio,
        stock,
        edad_recomendada,
        marca,
        imagen_url,
        activo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        producto.id,
        producto.categoriaId,
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.edadRecomendada,
        producto.marca,
        producto.imagenUrl,
        producto.activo ? 1 : 0,
      ]
    );

    const created =
      await this.findById(producto.id);

    if (!created) {
      throw new Error(
        'Error al crear producto'
      );
    }

    return created;
  }

  async findById(
    id: string
  ): Promise<Producto | null> {

    const [rows] =
      await pool.query<ProductoRow[]>(

        `SELECT *
         FROM productos
         WHERE id = ?
         LIMIT 1`,

        [id]
      );

    return rows[0]
      ? toProducto(rows[0])
      : null;
  }

  async findAll(): Promise<Producto[]> {

    const [rows] =
      await pool.query<ProductoRow[]>(

        `SELECT *
         FROM productos
         WHERE activo = 1
         ORDER BY nombre`
      );

    return rows.map(toProducto);
  }

  async update(
    id: string,
    data: Partial<Producto>
  ): Promise<Producto | null> {

    const fields: string[] = [];

    const values: unknown[] = [];

    if (data.categoriaId !== undefined) {
      fields.push('categoria_id = ?');
      values.push(data.categoriaId);
    }

    if (data.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(data.nombre);
    }

    if (data.descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(data.descripcion);
    }

    if (data.precio !== undefined) {
      fields.push('precio = ?');
      values.push(data.precio);
    }

    if (data.stock !== undefined) {
      fields.push('stock = ?');
      values.push(data.stock);
    }

    if (
      data.edadRecomendada !== undefined
    ) {
      fields.push(
        'edad_recomendada = ?'
      );

      values.push(
        data.edadRecomendada
      );
    }

    if (data.marca !== undefined) {
      fields.push('marca = ?');
      values.push(data.marca);
    }

    if (data.imagenUrl !== undefined) {
      fields.push('imagen_url = ?');
      values.push(data.imagenUrl);
    }

    values.push(id);

    await pool.query<ResultSetHeader>(
      `UPDATE productos
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

        `UPDATE productos
         SET activo = 0
         WHERE id = ?`,

        [id]
      );

    return result.affectedRows > 0;
  }

  async updateStock(
    id: string,
    stock: number
  ): Promise<void> {

    await pool.query<ResultSetHeader>(
      `UPDATE productos
       SET stock = ?
       WHERE id = ?`,
      [stock, id]
    );
  }
}