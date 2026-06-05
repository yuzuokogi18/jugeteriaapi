"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLClientesRepository = void 0;
const mysql_1 = __importDefault(require("../../database/mysql"));
const toCliente = (row) => ({
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
class MySQLClientesRepository {
    async create(cliente) {
        await mysql_1.default.query(`INSERT INTO clientes
      (
        id,
        nombre,
        apellido,
        telefono,
        email,
        direccion,
        activo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            cliente.id,
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.email,
            cliente.direccion,
            cliente.activo ? 1 : 0,
        ]);
        const created = await this.findById(cliente.id);
        if (!created) {
            throw new Error('Error al crear cliente');
        }
        return created;
    }
    async findById(id) {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM clientes
         WHERE id = ?
         LIMIT 1`, [id]);
        return rows[0]
            ? toCliente(rows[0])
            : null;
    }
    async findAll() {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM clientes
         WHERE activo = 1
         ORDER BY nombre`);
        return rows.map(toCliente);
    }
}
exports.MySQLClientesRepository = MySQLClientesRepository;
//# sourceMappingURL=MySQLClientesRepository.js.map