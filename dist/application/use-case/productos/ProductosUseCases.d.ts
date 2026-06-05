import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';
import { Producto } from '../../../domain/entities/Producto';
import { CreateProductoDto, UpdateProductoDto } from '../../dtos/producto.dto';
export declare class CreateProductoUseCase {
    private readonly productosRepo;
    constructor(productosRepo: IProductosRepository);
    execute(dto: CreateProductoDto): Promise<Producto>;
}
export declare class GetProductosUseCase {
    private readonly productosRepo;
    constructor(productosRepo: IProductosRepository);
    execute(): Promise<Producto[]>;
}
export declare class UpdateProductoUseCase {
    private readonly productosRepo;
    constructor(productosRepo: IProductosRepository);
    execute(id: string, dto: UpdateProductoDto): Promise<Producto>;
}
export declare class DeleteProductoUseCase {
    private readonly productosRepo;
    constructor(productosRepo: IProductosRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=ProductosUseCases.d.ts.map