import { User } from '../user/user.model';
import { Hospital } from './../hospital/hospital.model';

export class Doctor{
    constructor(
        public id: string,
        public name: string,
        public user: User,
        public hospital: Hospital,
        public image?: string
    ){}
    
    static create(data: Doctor): Doctor{
        return new Doctor(
            data.id,
            data.name,
            data.user,
            data.hospital,
            data.image
        );
    }

    public fromObject(obj: { [key: string]: any }): Doctor{
        const { id, name, user, hospital, image } = obj;

        if (!id) {
            throw new Error('Doctor id is required');
        }

        if (!name) {
            throw new Error('Doctor name is required');
        }

        if (!user) {
            throw new Error('Doctor user is required');
        }

        if (!hospital) {
            throw new Error('Doctor hospital is required');
        }

        return new Doctor(id, name, user, hospital, image);
    }
}