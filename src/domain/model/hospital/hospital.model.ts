import { User } from "../user/user.model";

export class Hospital {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly user: User,
        public readonly image?: string
    ) { }
    
    public static create(data: Hospital): Hospital {
        return new Hospital(
            data.id,
            data.name,
            data.user,
            data.image
        );
    }

    public fromObject(object: { [key: string]: any }): Hospital {
        const { id, name, user, image } = object;

        if (!id) {
            throw new Error('Hospital id is required');
        }

        if (!name) {
            throw new Error('Hospital name is required');
        }

        if (!user) {
            throw new Error('Hospital user is required');
        }

        return new Hospital(id, name, user, image);
    }
}
