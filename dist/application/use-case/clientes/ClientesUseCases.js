"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientesUseCase = exports.CreateClienteUseCase = void 0;
const uuid_1 = require("uuid");
class CreateClienteUseCase {
    constructor(clientesRepo) {
        this.clientesRepo = clientesRepo;
    }
    async execute(dto) {
        return this.clientesRepo.create({
            id: (0, uuid_1.v4)(),
            nombre: dto.nombre,
            apellido: dto.apellido,
            telefono: dto.telefono ?? null,
            email: dto.email ?? null,
            direccion: dto.direccion ?? null,
            activo: true,
        });
    }
}
exports.CreateClienteUseCase = CreateClienteUseCase;
class GetClientesUseCase {
    constructor(clientesRepo) {
        this.clientesRepo = clientesRepo;
    }
    async execute() {
        return this.clientesRepo.findAll();
    }
}
exports.GetClientesUseCase = GetClientesUseCase;
//# sourceMappingURL=ClientesUseCases.js.map