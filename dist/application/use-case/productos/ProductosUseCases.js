"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductoUseCase = exports.UpdateProductoUseCase = exports.GetProductosUseCase = exports.CreateProductoUseCase = void 0;
const uuid_1 = require("uuid");
class CreateProductoUseCase {
    constructor(productosRepo) {
        this.productosRepo = productosRepo;
    }
    async execute(dto) {
        return this.productosRepo.create({
            id: (0, uuid_1.v4)(),
            categoriaId: dto.categoriaId,
            nombre: dto.nombre,
            descripcion: dto.descripcion ?? null,
            precio: dto.precio,
            stock: dto.stock,
            edadRecomendada: dto.edadRecomendada ?? null,
            marca: dto.marca ?? null,
            imagenUrl: dto.imagenUrl ?? null,
            activo: true,
        });
    }
}
exports.CreateProductoUseCase = CreateProductoUseCase;
class GetProductosUseCase {
    constructor(productosRepo) {
        this.productosRepo = productosRepo;
    }
    async execute() {
        return this.productosRepo.findAll();
    }
}
exports.GetProductosUseCase = GetProductosUseCase;
class UpdateProductoUseCase {
    constructor(productosRepo) {
        this.productosRepo = productosRepo;
    }
    async execute(id, dto) {
        const producto = await this.productosRepo.findById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        const updated = await this.productosRepo.update(id, dto);
        if (!updated) {
            throw new Error('No se pudo actualizar');
        }
        return updated;
    }
}
exports.UpdateProductoUseCase = UpdateProductoUseCase;
class DeleteProductoUseCase {
    constructor(productosRepo) {
        this.productosRepo = productosRepo;
    }
    async execute(id) {
        const producto = await this.productosRepo.findById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        await this.productosRepo.softDelete(id);
    }
}
exports.DeleteProductoUseCase = DeleteProductoUseCase;
//# sourceMappingURL=ProductosUseCases.js.map