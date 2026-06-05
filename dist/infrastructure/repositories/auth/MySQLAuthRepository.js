"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLAuthRepository = void 0;
const mysql_1 = __importDefault(require("../../database/mysql"));
const toUser = (row) => ({
    id: row.id,
    nombre: row.nombre,
    apellido: row.apellido,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    activo: row.activo === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});
class MySQLAuthRepository {
    async findByEmail(email) {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM users
         WHERE email = ?
         AND activo = 1
         LIMIT 1`, [email]);
        return rows[0]
            ? toUser(rows[0])
            : null;
    }
    async findById(id) {
        const [rows] = await mysql_1.default.query(`SELECT *
         FROM users
         WHERE id = ?
         LIMIT 1`, [id]);
        return rows[0]
            ? toUser(rows[0])
            : null;
    }
    async create(user) {
        await mysql_1.default.query(`INSERT INTO users
      (
        id,
        nombre,
        apellido,
        email,
        password_hash,
        role,
        activo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            user.id,
            user.nombre,
            user.apellido,
            user.email,
            user.passwordHash,
            user.role,
            user.activo ? 1 : 0,
        ]);
        const created = await this.findById(user.id);
        if (!created) {
            throw new Error('Error al crear usuario');
        }
        return created;
    }
    async existsByEmail(email) {
        const [rows] = await mysql_1.default.query(`SELECT 1
         FROM users
         WHERE email = ?
         LIMIT 1`, [email]);
        return rows.length > 0;
    }
}
exports.MySQLAuthRepository = MySQLAuthRepository;
//# sourceMappingURL=MySQLAuthRepository.js.map