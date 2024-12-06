import { Doctor } from '@domain/model/doctor/doctor.model';

export interface DoctorGateway {
    getDoctorById(id: string): Promise<Doctor>;
    getDoctorByEmail(email: string): Promise<Doctor>;
    getDoctors(): Promise<Doctor[]>;
    saveDoctor(doctor: Doctor): Promise<Doctor>;
    updateDoctor(id: string, doctor: Doctor): Promise<Doctor>;
    deleteDoctor(id: string): Promise<boolean>;
}
