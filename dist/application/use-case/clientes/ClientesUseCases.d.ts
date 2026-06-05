import { IClientesRepository } from '../../../domain/repositories/IClientesRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { CreateClienteDto } from '../../dtos/cliente.dto';
export declare class CreateClienteUseCase {
    private readonly clientesRepo;
    constructor(clientesRepo: IClientesRepository);
    execute(dto: CreateClienteDto): Promise<Cliente>;
}
export declare class GetClientesUseCase {
    private readonly clientesRepo;
    constructor(clientesRepo: IClientesRepository);
    execute(): Promise<Cliente[]>;
}
//# sourceMappingURL=ClientesUseCases.d.ts.map