import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { UserPublic } from '../../../domain/entities/User';
export declare class GetMeUseCase {
    private readonly authRepo;
    constructor(authRepo: IAuthRepository);
    execute(userId: string): Promise<UserPublic>;
}
//# sourceMappingURL=GetMeUseCase.d.ts.map