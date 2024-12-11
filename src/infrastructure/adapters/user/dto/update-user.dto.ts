import { BussinesException } from '@domain/model/exceptions/bussines.exception';

export class UpdateUserDto {
    constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly password?: string,
        public readonly role?: string,
        public readonly image?: string
    ) {}

    public static create(data: UpdateUserDto): UpdateUserDto {
        return new UpdateUserDto(
            data.name,
            data.email,
            data.password,
            data.role,
            data.image
        );
    }

    public static fromObject(object: { [key: string]: any }): UpdateUserDto {
        const { name, email, password, role = 'user', image } = object;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            throw BussinesException.badRequest('User email is not valid');
        }

        return new UpdateUserDto(name, email, password, role, image);
    }
}
