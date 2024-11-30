import { UserGateway } from "../../model/user/gateway/user.gateway";
import { User } from "../../model/user/user.model";

export class UserUseCase{
    constructor(private readonly userGateway: UserGateway) { }
    
    async getAll() {
        const users = await this.userGateway.getUsers();
        return users;
    }

    async getOne(id: string) {
        const user = await this.userGateway.getUserById(id);
        return user;
    }

    async create(user: User) {
        const newUser = await this.userGateway.saveUser(user);
        return newUser;
    }

    async update(id: string, user: User) {
        const updatedUser = await this.userGateway.updateUser(id, user);
        return updatedUser;
    }

    async delete(id: string) {
        const deletedUser = await this.userGateway.deleteUser(id);
        return deletedUser;
    }
    
}