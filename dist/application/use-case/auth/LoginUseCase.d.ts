import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { LoginDto, AuthResponseDto } from '../../dtos/auth.dto';
export declare class LoginUseCase {
    private readonly authRepo;
    constructor(authRepo: IAuthRepository);
    execute(dto: LoginDto): Promise<AuthResponseDto>;
}
//# sourceMappingURL=LoginUseCase.d.ts.map