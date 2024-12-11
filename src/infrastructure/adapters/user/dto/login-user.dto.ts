import { BussinesException } from '@domain/model/exceptions/bussines.exception';

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {
        this.validateFields(email, password);
    }

    private validateFields(email: string, password: string) {
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
    }

    public static create(data: LoginUserDto): LoginUserDto {
        return new LoginUserDto(data.email, data.password);
    }

    public static fromObject(object: { [key: string]: any }): LoginUserDto {
        const { email, password } = object;

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

        return new LoginUserDto(email, password);
    }
}
