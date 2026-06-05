"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLProductosRepository = void 0;
const mysql_1 = __importDefault(require("../../database/mysql"));
const toProducto = (row) => ({
    id: row.id,
    categoriaId: row.categoria_id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    precio: Number(row.precio),
    stock: row.stock,
    edadRecomendada: row.edad_recomendada,
    marca: row.marca,
    imagenUrl: row.imagen_url,
    activo: row.activo === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});
class MySQLProductosRepository {
    async create(producto) {
        await mysql_1.default.query(`INSERT INTO productos
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
        ]);
        const created = await this.findById(producto.id);
        if (!created) {
            throw new Error('Error al crear producto');
        }
        return created;
    }
    async findById(id) {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM productos
         WHERE id = ?
         LIMIT 1`, [id]);
        return rows[0]
            ? toProducto(rows[0])
            : null;
    }
    async findAll() {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM productos
         WHERE activo = 1
         ORDER BY nombre`);
        return rows.map(toProducto);
    }
    async update(id, data) {
        const fields = [];
        const values = [];
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
        if (data.edadRecomendada !== undefined) {
            fields.push('edad_recomendada = ?');
            values.push(data.edadRecomendada);
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
        await mysql_1.default.query(`UPDATE productos
       SET ${fields.join(', ')}
       WHERE id = ?`, values);
        return this.findById(id);
    }
    async softDelete(id) {
        const [result] = await mysql_1.default.query(`UPDATE productos
         SET activo = 0
         WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
    async updateStock(id, stock) {
        await mysql_1.default.query(`UPDATE productos
       SET stock = ?
       WHERE id = ?`, [stock, id]);
    }
}
exports.MySQLProductosRepository = MySQLProductosRepository;
//# sourceMappingURL=MySQLProductosRepository.js.map