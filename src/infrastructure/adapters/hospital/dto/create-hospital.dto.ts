import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { User } from '@domain/model/user/user.model';

export class CreateHospitalDto {
    constructor(
        public readonly name: string,
        public readonly user: User,
        public readonly image?: string
    ) {}

    public static create(data: CreateHospitalDto): CreateHospitalDto {
        return this.fromObject(data);
    }

    public static fromObject(object: {
        [key: string]: any;
    }): CreateHospitalDto {
        const { name, user, image } = object;

        if (!name) {
            throw BussinesException.badRequest('Hospital name is required');
        }

        if (!user) {
            throw BussinesException.badRequest('Hospital user is required');
        }

        return new CreateHospitalDto(name, user, image);
    }
}
