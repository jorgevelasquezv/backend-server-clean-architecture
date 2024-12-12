export class UpdateDoctorRequest {
    constructor(
        public user: string,
        public name?: string,
        public hospital?: string,
        public image?: string
    ) {}

    static create(data: UpdateDoctorRequest): UpdateDoctorRequest {
        return new UpdateDoctorRequest(
            data.user,
            data.name,
            data.hospital,
            data.image
        );
    }

    static fromObject(obj: { [key: string]: any }): UpdateDoctorRequest {
        const { name, user, hospital, image } = obj;

        if (!user) {
            throw new Error('Doctor user is required');
        }

        return new UpdateDoctorRequest(user, name, hospital, image);
    }
}