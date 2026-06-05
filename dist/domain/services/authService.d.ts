import { UserPublic } from '../entities/User';
export declare const hashPassword: (plain: string) => Promise<string>;
export declare const comparePassword: (plain: string, hash: string) => Promise<boolean>;
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
export declare const signToken: (user: UserPublic) => string;
export declare const verifyToken: (token: string) => JwtPayload;
//# sourceMappingURL=authService.d.ts.map