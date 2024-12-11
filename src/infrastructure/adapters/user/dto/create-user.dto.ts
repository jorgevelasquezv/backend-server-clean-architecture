import { BussinesException } from "@domain/model/exceptions/bussines.exception";

export class CreateUserDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role?: string,
        public readonly image?: string,
        public readonly createByGoogle?: boolean
    ) {}

    public static create(data: CreateUserDto): CreateUserDto {
        return new CreateUserDto(
            data.name,
            data.email,
            data.password,
            data.role,
            data.image,
            data.createByGoogle
        );
    }

    get isGoogleUser(): boolean {
        return !!this.createByGoogle;
    }

    public static fromObject(object: { [key: string]: any }): CreateUserDto {
        const {
            name,
            email,
            password,
            role,
            image,
            createByGoogle,
        } = object;

        if (!name) {
            throw BussinesException.badRequest('User name is required');
        }

        if (!email) {
            throw BussinesException.badRequest('User email is required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw BussinesException.badRequest('User email is not valid');
        }

        if (!password) {
            throw BussinesException.badRequest('User password is required');
        }

        return new CreateUserDto(
            name,
            email,
            password,
            role,
            image,
            createByGoogle
        );
    }
}
