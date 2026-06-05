import { Producto } from '../../../domain/entities/Producto';
import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';
export declare class MySQLProductosRepository implements IProductosRepository {
    create(producto: Omit<Producto, 'createdAt' | 'updatedAt'>): Promise<Producto>;
    findById(id: string): Promise<Producto | null>;
    findAll(): Promise<Producto[]>;
    update(id: string, data: Partial<Producto>): Promise<Producto | null>;
    softDelete(id: string): Promise<boolean>;
    updateStock(id: string, stock: number): Promise<void>;
}
//# sourceMappingURL=MySQLProductosRepository.d.ts.map