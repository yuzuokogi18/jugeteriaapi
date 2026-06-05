import { Cliente } from '../../../domain/entities/Cliente';
import { IClientesRepository } from '../../../domain/repositories/IClientesRepository';
export declare class MySQLClientesRepository implements IClientesRepository {
    create(cliente: Omit<Cliente, 'createdAt' | 'updatedAt'>): Promise<Cliente>;
    findById(id: string): Promise<Cliente | null>;
    findAll(): Promise<Cliente[]>;
}
//# sourceMappingURL=MySQLClientesRepository.d.ts.map