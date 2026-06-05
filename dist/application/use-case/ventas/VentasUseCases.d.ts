import { IVentasRepository } from '../../../domain/repositories/IVentasRepository';
import { IProductosRepository } from '../../../domain/repositories/IProductosRepository';
import { Venta } from '../../../domain/entities/Venta';
import { CreateVentaDto } from '../../dtos/venta.dto';
export declare class CreateVentaUseCase {
    private readonly ventasRepo;
    private readonly productosRepo;
    constructor(ventasRepo: IVentasRepository, productosRepo: IProductosRepository);
    execute(dto: CreateVentaDto, userId: string): Promise<Venta>;
}
//# sourceMappingURL=VentasUseCases.d.ts.map