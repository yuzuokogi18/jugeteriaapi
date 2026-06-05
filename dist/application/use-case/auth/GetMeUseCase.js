"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMeUseCase = void 0;
class GetMeUseCase {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    async execute(userId) {
        const user = await this.authRepo.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            role: user.role,
            activo: user.activo,
            createdAt: user.createdAt,
        };
    }
}
exports.GetMeUseCase = GetMeUseCase;
//# sourceMappingURL=GetMeUseCase.js.map