import { Categoria } from '../../../domain/entities/Categoria';
import { ICategoriasRepository } from '../../../domain/repositories/ICategoriasRepository';
export declare class MySQLCategoriasRepository implements ICategoriasRepository {
    create(categoria: Omit<Categoria, 'createdAt' | 'updatedAt'>): Promise<Categoria>;
    findById(id: string): Promise<Categoria | null>;
    findAll(): Promise<Categoria[]>;
    update(id: string, data: Partial<Categoria>): Promise<Categoria | null>;
    softDelete(id: string): Promise<boolean>;
}
//# sourceMappingURL=MySQLCategoriasRepository.d.ts.map