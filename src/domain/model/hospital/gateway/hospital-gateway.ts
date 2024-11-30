import { Hospital } from '../hospital.model';

export interface HospitalGateway {
    createHospital(hospital: Hospital): Promise<Hospital>;
    updateHospital(id: string, hospital: Hospital): Promise<Hospital>;
    deleteHospital(id: string): Promise<boolean>;
    getHospitalById(id: string): Promise<Hospital>;
    getHospitals(): Promise<Hospital[]>;
}
