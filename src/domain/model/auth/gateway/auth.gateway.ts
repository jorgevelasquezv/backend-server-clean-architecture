import { User } from "@domain/model/user";
import { Auth } from "../auth.model";
import { LoginRequest } from "../login.model";

export interface AuthGateway {
    login(login: LoginRequest): Promise<Auth>;
    register(user: User): Promise<Auth>;
    renewToken(token: string): Promise<Auth>;
}
