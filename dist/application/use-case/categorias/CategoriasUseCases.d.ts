import { ICategoriasRepository } from '../../../domain/repositories/ICategoriasRepository';
import { Categoria } from '../../../domain/entities/Categoria';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../../dtos/categoria.dto';
export declare class CreateCategoriaUseCase {
    private readonly categoriasRepo;
    constructor(categoriasRepo: ICategoriasRepository);
    execute(dto: CreateCategoriaDto): Promise<Categoria>;
}
export declare class GetCategoriasUseCase {
    private readonly categoriasRepo;
    constructor(categoriasRepo: ICategoriasRepository);
    execute(): Promise<Categoria[]>;
}
export declare class UpdateCategoriaUseCase {
    private readonly categoriasRepo;
    constructor(categoriasRepo: ICategoriasRepository);
    execute(id: string, dto: UpdateCategoriaDto): Promise<Categoria>;
}
export declare class DeleteCategoriaUseCase {
    private readonly categoriasRepo;
    constructor(categoriasRepo: ICategoriasRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=CategoriasUseCases.d.ts.map