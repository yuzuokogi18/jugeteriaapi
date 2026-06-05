"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const uuid_1 = require("uuid");
const authService_1 = require("../../../domain/services/authService");
class RegisterUseCase {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    async execute(dto) {
        const exists = await this.authRepo.existsByEmail(dto.email);
        if (exists) {
            throw new Error('El correo ya existe');
        }
        const passwordHash = await (0, authService_1.hashPassword)(dto.password);
        const user = await this.authRepo.create({
            id: (0, uuid_1.v4)(),
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email
                .toLowerCase()
                .trim(),
            passwordHash,
            role: dto.role,
            activo: true,
        });
        const token = (0, authService_1.signToken)({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            role: user.role,
            activo: user.activo,
            createdAt: user.createdAt,
        });
        return {
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.RegisterUseCase = RegisterUseCase;
//# sourceMappingURL=RegisterUseCase.js.map