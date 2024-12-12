import { CreateDoctorRequest, UpdateDoctorRequest } from "@domain/model/doctor";
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

    async create(createDoctorRequest: CreateDoctorRequest) {
        const newDoctor = await this.doctorGateway.saveDoctor(createDoctorRequest);
        return newDoctor;
    }

    async update(id: string, updateDoctorRequest: UpdateDoctorRequest) {
        const updatedDoctor = await this.doctorGateway.updateDoctor(id, updateDoctorRequest);
        return updatedDoctor;
    }

    async delete(id: string) {
        const deletedDoctor = await this.doctorGateway.deleteDoctor(id);
        return deletedDoctor;
    }
}