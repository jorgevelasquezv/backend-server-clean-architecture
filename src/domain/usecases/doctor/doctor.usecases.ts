import { Doctor } from "@domain/model/doctor/doctor.model";
import { DoctorGateway } from "@domain/model/doctor/gateway/doctor.gateway";


export class DoctorUseCase {
    constructor(private readonly doctorGateway: DoctorGateway) { }
    
    async getAll() {
        const doctors = await this.doctorGateway.getDoctors();
        return doctors;
    }

    async getOne(id: string) {
        const doctor = await this.doctorGateway.getDoctorById(id);
        return doctor;
    }

    async create(doctor: Doctor) {
        const newDoctor = await this.doctorGateway.saveDoctor(doctor);
        return newDoctor;
    }

    async update(id: string, doctor: Doctor) {
        const updatedDoctor = await this.doctorGateway.updateDoctor(id, doctor);
        return updatedDoctor;
    }

    async delete(id: string) {
        const deletedDoctor = await this.doctorGateway.deleteDoctor(id);
        return deletedDoctor;
    }
}