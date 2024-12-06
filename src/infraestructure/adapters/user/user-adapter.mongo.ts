import { UserDto } from '../../../../database/models/user.model';
import { BussinesException } from '../../../domain/model/exceptions/bussines.exception';
import { TechnicalException } from '../../../domain/model/exceptions/technical.exception';
import { UserGateway } from '../../../domain/model/user/gateway/user.gateway';
import { User } from '../../../domain/model/user/user.model';
import { CreateUserDto } from './dto/create-user.dto';

export class UserAdpterMongoRepository implements UserGateway {
    async saveUser(createUserDto: CreateUserDto): Promise<User> {
        const user = CreateUserDto.fromObject(createUserDto);
        const { email, password } = user;

        const userExist = await UserDto.findOne({ email });

        if (userExist) {
            throw BussinesException.conflict(
                `User with email: ${email} already exist`
            );
        }

        try {
            const userDto = new UserDto(user);

            userDto.password = await userDto.encrypPassword(password);

            const savedUser = await userDto.save();
            return User.fromObject(savedUser.toJSON());
        } catch (error) {
            throw TechnicalException.internalServerError(`Error: ${error}`);
        }
    }

    async updateUser(id: string, user: User): Promise<User> {
        const updatedUser = await UserDto.findByIdAndUpdate(id, user, {
            new: true,
        });
        if (!updatedUser) {
            throw BussinesException.notFound(`User wiht id: ${id} not found`);
        }
        return User.fromObject(updatedUser.toJSON());
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await UserDto.findByIdAndDelete(id);
        if (!result) {
            throw BussinesException.notFound(`User wiht id: ${id} not found`);
        }
        return true;
    }

    async getUserById(id: string): Promise<User> {
        const userDto = await UserDto.findById(id);
        if (!userDto) {
            throw BussinesException.notFound(`User wiht id: ${id} not found`);
        }
        return User.fromObject(userDto.toJSON());
    }

    async getUsers(): Promise<User[]> {
        const usersDto = await UserDto.find();
        return usersDto.map((userDto) => User.fromObject(userDto.toJSON()));
    }
}
