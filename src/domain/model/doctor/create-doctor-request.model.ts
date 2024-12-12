export class CreateDoctorRequest {
    constructor(
        public name: string,
        public user: string,
        public hospital: string,
        public image?: string
    ) {}

    static create(data: CreateDoctorRequest): CreateDoctorRequest {
        return new CreateDoctorRequest(
            data.name,
            data.user,
            data.hospital,
            data.image
        );
    }

    static fromObject(obj: { [key: string]: any }): CreateDoctorRequest {
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

        return new CreateDoctorRequest(name, user, hospital, image);
    }
}