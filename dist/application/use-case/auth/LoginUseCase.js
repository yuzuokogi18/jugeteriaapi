"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const authService_1 = require("../../../domain/services/authService");
class LoginUseCase {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    async execute(dto) {
        const user = await this.authRepo.findByEmail(dto.email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        const valid = await (0, authService_1.comparePassword)(dto.password, user.passwordHash);
        if (!valid) {
            throw new Error('Credenciales inválidas');
        }
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
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map