import { User } from '@domain/model/user';
import { UserGateway } from '@domain/model/user/gateway/user.gateway';

export class UserUseCase {
    constructor(private readonly userGateway: UserGateway) {}

    async getAll(): Promise<User[]> {
        const users = await this.userGateway.getUsers();
        return users;
    }

    async getOne(id: string): Promise<User> {
        const user = await this.userGateway.getUserById(id);
        return user;
    }

    async create(user: User): Promise<User> {
        const newUser = await this.userGateway.saveUser(user);
        return newUser;
    }

    async update(id: string, user: User): Promise<User> {
        const updatedUser = await this.userGateway.updateUser(id, user);
        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        const deletedUser = await this.userGateway.deleteUser(id);
        return deletedUser;
    }
}
