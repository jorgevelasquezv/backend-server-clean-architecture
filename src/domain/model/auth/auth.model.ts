import { User } from "../user";

export class Auth {
    constructor(
        public readonly user: User,
        public readonly token: string
    ) {}

    public static create(user: User, token: string): Auth {
        return new Auth(user, token);
    }

    public static fromObject(object: { [key: string]: any }): Auth {
        const { user, token } = object;

        if (!user) {
            throw new Error('User is required');
        }

        if (!token) {
            throw new Error('Token is required');
        }

        return new Auth(User.fromObject(user), token);
    }


}