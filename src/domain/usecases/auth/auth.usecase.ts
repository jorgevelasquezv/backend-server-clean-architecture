import { LoginRequest } from '@domain/model/auth';
import { Auth } from '@domain/model/auth/auth.model';
import { AuthGateway } from '@domain/model/auth/gateway/auth.gateway';
import { User } from '@domain/model/user';
export class AuthUsecase {
    constructor(private readonly authGateway: AuthGateway) { }
    
    async login(login: LoginRequest): Promise<Auth> {
        return this.authGateway.login(login);
    }

    async register(user: User) {
        return this.authGateway.register(user);
    }

    async renewToken(token: string) {
        return this.authGateway.renewToken(token);
    }
}