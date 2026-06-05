import { Producto } from '../entities/Producto';
export interface IProductosRepository {
    create(producto: Omit<Producto, 'createdAt' | 'updatedAt'>): Promise<Producto>;
    findById(id: string): Promise<Producto | null>;
    findAll(): Promise<Producto[]>;
    update(id: string, data: Partial<Omit<Producto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Producto | null>;
    softDelete(id: string): Promise<boolean>;
    updateStock(id: string, stock: number): Promise<void>;
}
//# sourceMappingURL=IProductosRepository.d.ts.map