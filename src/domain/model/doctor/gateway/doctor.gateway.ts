import { Doctor } from "../doctor.model";
import { CreateDoctorRequest } from "../create-doctor-request.model";
import { UpdateDoctorRequest } from "../update-doctor-request.model";

export interface DoctorGateway {
    getDoctorById(id: string): Promise<Doctor>;
    getDoctorByEmail(email: string): Promise<Doctor>;
    getDoctors(): Promise<Doctor[]>;
    saveDoctor(doctorRequest: CreateDoctorRequest): Promise<Doctor>;
    updateDoctor(id: string, doctorRequest: UpdateDoctorRequest): Promise<Doctor>;
    deleteDoctor(id: string): Promise<boolean>;
}
