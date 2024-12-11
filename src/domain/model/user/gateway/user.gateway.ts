import { User } from '@domain/model/user/user.model';

export interface UserGateway {
    saveUser(user: User): Promise<User>;
    updateUser(id: string, user: User): Promise<User>;
    deleteUser(id: string): Promise<boolean>;
    getUserById(id: string): Promise<User>;
    getUsers(): Promise<User[]>;
    getUserByEmail(email: string, password: string): Promise<User>;
}