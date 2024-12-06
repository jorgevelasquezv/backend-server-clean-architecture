import { Hospital } from "../../../domain/model/hospital/hospital.model";
import { User } from "../../../domain/model/user/user.model";

export class CreateDoctorDto {
    constructor(
        public name: string,
        public user: User,
        public hospital: Hospital,
        public image?: string
    ) {}

    static create(data: CreateDoctorDto): CreateDoctorDto {
        return new CreateDoctorDto(
            data.name,
            data.user,
            data.hospital,
            data.image
        );
    }

    static fromObject(obj: { [key: string]: any }): CreateDoctorDto {
        const { name, user, hospital, image } = obj;

        if (!name) {
            throw new Error('Doctor name is required');
        }

        if (!user) {
            throw new Error('Doctor user is required');
        }

        if (!hospital) {
            throw new Error('Doctor hospital is required');
        }

        return new CreateDoctorDto(name, user, hospital, image);
    }
}