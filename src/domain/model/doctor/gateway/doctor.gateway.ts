import { Doctor } from "../doctor.model";

export interface DoctorGateway {
    getDoctorById(id: string): Promise<Doctor | undefined>;
    getDoctorByEmail(email: string): Promise<Doctor | undefined>;
    getDoctors(): Promise<Doctor[]>;
    saveDoctor(doctor: Doctor): Promise<void>;
    updateDoctor(id: string, doctor: Doctor): Promise<void>;
    deleteDoctor(id: string): Promise<void>;
}
