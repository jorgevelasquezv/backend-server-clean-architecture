export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly image?: string,
        public readonly createByGoogle?: boolean
    ) {}

    public static create(data: User): User {
        return new User(
            data.id,
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

    public static fromObject(object: { [key: string]: any }): User {
        const { id, name, email, password, role = 'user', image, createByGoogle } = object;

        if (!id) {
            throw new Error('User id is required');
        }

        if (!name) {
            throw new Error('User name is required');
        }

        if (!email) {
            throw new Error('User email is required');
        }

        if (!password) {
            throw new Error('User password is required');
        }

        return new User(id, name, email, password, role, image, createByGoogle);
    }
}
