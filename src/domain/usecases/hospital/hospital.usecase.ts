import { HospitalGateway } from "@domain/model/hospital/gateway/hospital-gateway";
import { Hospital } from "@domain/model/hospital/hospital.model";


export class HospitalUseCase{
    constructor(private readonly hospitalGateway: HospitalGateway) { }
    
    async getAll() {
        const hospitals = await this.hospitalGateway.getHospitals();
        return hospitals;
    }

    async getOne(id: string) {
        const hospital = await this.hospitalGateway.getHospitalById(id);
        return hospital;
    }

    async create(hospital: Hospital) {
        const newHospital = await this.hospitalGateway.createHospital(hospital);
        return newHospital;
    }

    async update(id: string, hospital: Hospital) {
        const updatedHospital = await this.hospitalGateway.updateHospital(id, hospital);
        return updatedHospital;
    }

    async delete(id: string) {
        const deletedHospital = await this.hospitalGateway.deleteHospital(id);
        return deletedHospital;
    }
    
}