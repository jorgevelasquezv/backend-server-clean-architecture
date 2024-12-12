export class LoginRequest{
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }
    
    public static create(data: LoginRequest): LoginRequest {
        return new LoginRequest(data.email, data.password);
    }

    public static fromObject(object: { [key: string]: any }): LoginRequest {
        const { email, password } = object;

        if (!email) {
            throw new Error('User email is required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('User email is not valid');
        }
        
        if (!password) {
            throw new Error('User password is required');
        }

        return new LoginRequest(email, password);
    }
} 