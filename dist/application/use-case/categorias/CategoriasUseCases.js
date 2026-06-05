"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoriaUseCase = exports.UpdateCategoriaUseCase = exports.GetCategoriasUseCase = exports.CreateCategoriaUseCase = void 0;
const uuid_1 = require("uuid");
class CreateCategoriaUseCase {
    constructor(categoriasRepo) {
        this.categoriasRepo = categoriasRepo;
    }
    async execute(dto) {
        return this.categoriasRepo.create({
            id: (0, uuid_1.v4)(),
            nombre: dto.nombre,
            descripcion: dto.descripcion ?? null,
            activa: true,
        });
    }
}
exports.CreateCategoriaUseCase = CreateCategoriaUseCase;
class GetCategoriasUseCase {
    constructor(categoriasRepo) {
        this.categoriasRepo = categoriasRepo;
    }
    async execute() {
        return this.categoriasRepo.findAll();
    }
}
exports.GetCategoriasUseCase = GetCategoriasUseCase;
class UpdateCategoriaUseCase {
    constructor(categoriasRepo) {
        this.categoriasRepo = categoriasRepo;
    }
    async execute(id, dto) {
        const categoria = await this.categoriasRepo.findById(id);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        const updated = await this.categoriasRepo.update(id, dto);
        if (!updated) {
            throw new Error('No se pudo actualizar');
        }
        return updated;
    }
}
exports.UpdateCategoriaUseCase = UpdateCategoriaUseCase;
class DeleteCategoriaUseCase {
    constructor(categoriasRepo) {
        this.categoriasRepo = categoriasRepo;
    }
    async execute(id) {
        const categoria = await this.categoriasRepo.findById(id);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        await this.categoriasRepo.softDelete(id);
    }
}
exports.DeleteCategoriaUseCase = DeleteCategoriaUseCase;
//# sourceMappingURL=CategoriasUseCases.js.map