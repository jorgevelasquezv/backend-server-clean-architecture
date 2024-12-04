export interface UpdateHospitalDto {
    id?: string;
    name?: string;
    user?: UserUpdateDto;
    image?: string;
}

export interface UserUpdateDto {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    image?: string;
    createByGoogle?: boolean;
}
