import { jwtadpter } from '@application/config';
import { UserDto } from '@database/models/user.model';
import { LoginRequest, Auth } from '@domain/model/auth';
import { AuthGateway } from '@domain/model/auth/gateway/auth.gateway';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { User } from '@domain/model/user';

export class AuthAdapterMongoRepository implements AuthGateway {
    async login(login: LoginRequest): Promise<Auth> {
        const { email, password } = LoginRequest.fromObject(login);

        const existUser = await UserDto.findOne({ email });

        if (!existUser) {
            throw BussinesException.notFound('Invalid email or password');
        }

        const validPassword = await existUser.comparePassword(password);

        if (!validPassword) {
            throw BussinesException.notFound('Invalid email or password');
        }

        const user = User.fromObject(existUser.toJSON());
        const token = jwtadpter.sign(user.id);

        return Auth.fromObject({ user, token });
    }

    register(user: User): Promise<Auth> {
        throw new Error('Method not implemented.');
    }

    renewToken(token: string): Promise<Auth> {
        throw new Error('Method not implemented.');
    }
}