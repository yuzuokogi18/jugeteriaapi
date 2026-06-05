import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { RegisterDto, AuthResponseDto } from '../../dtos/auth.dto';
export declare class RegisterUseCase {
    private readonly authRepo;
    constructor(authRepo: IAuthRepository);
    execute(dto: RegisterDto): Promise<AuthResponseDto>;
}
//# sourceMappingURL=RegisterUseCase.d.ts.map