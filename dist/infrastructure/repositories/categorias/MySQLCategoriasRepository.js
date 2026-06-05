"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLCategoriasRepository = void 0;
const mysql_1 = __importDefault(require("../../database/mysql"));
const toCategoria = (row) => ({
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    activa: row.activa === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});
class MySQLCategoriasRepository {
    async create(categoria) {
        await mysql_1.default.query(`INSERT INTO categorias
      (
        id,
        nombre,
        descripcion,
        activa
      )
      VALUES (?, ?, ?, ?)`, [
            categoria.id,
            categoria.nombre,
            categoria.descripcion,
            categoria.activa ? 1 : 0,
        ]);
        const created = await this.findById(categoria.id);
        if (!created) {
            throw new Error('Error al crear categoría');
        }
        return created;
    }
    async findById(id) {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM categorias
         WHERE id = ?
         LIMIT 1`, [id]);
        return rows[0]
            ? toCategoria(rows[0])
            : null;
    }
    async findAll() {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM categorias
         WHERE activa = 1
         ORDER BY nombre`);
        return rows.map(toCategoria);
    }
    async update(id, data) {
        const fields = [];
        const values = [];
        if (data.nombre !== undefined) {
            fields.push('nombre = ?');
            values.push(data.nombre);
        }
        if (data.descripcion !== undefined) {
            fields.push('descripcion = ?');
            values.push(data.descripcion);
        }
        values.push(id);
        await mysql_1.default.query(`UPDATE categorias
       SET ${fields.join(', ')}
       WHERE id = ?`, values);
        return this.findById(id);
    }
    async softDelete(id) {
        const [result] = await mysql_1.default.query(`UPDATE categorias
         SET activa = 0
         WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}
exports.MySQLCategoriasRepository = MySQLCategoriasRepository;
//# sourceMappingURL=MySQLCategoriasRepository.js.map