import { DoctorDto } from '../../../../database/models/doctor.model';
import { Doctor } from '../../../domain/model/doctor/doctor.model';
import { DoctorGateway } from '../../../domain/model/doctor/gateway/doctor.gateway';
import { BussinesException } from '../../../domain/model/exceptions/bussines.exception';
import { TechnicalException } from '../../../domain/model/exceptions/technical.exception';
import { CreateDoctorDto } from './create-doctor.dto';

export class DoctorAdapterMongoRepository implements DoctorGateway {
    async getDoctorById(id: string): Promise<Doctor> {
        const doctor = await DoctorDto.findById(id)
            .populate('user')
            .populate('hospital');
        if (!doctor) {
            throw BussinesException.notFound(`Doctor wiht id: ${id} not found`);
        }
        return Doctor.fromObject(doctor.toJSON());
    }

    async getDoctorByEmail(email: string): Promise<Doctor> {
        const doctor = await DoctorDto.findOne({ user: { email } })
            .populate('user')
            .populate('hospital');
        if (!doctor) {
            throw BussinesException.notFound(
                `Doctor wiht email: ${email} not found`
            );
        }
        return Doctor.fromObject(doctor.toJSON());
    }

    async getDoctors(): Promise<Doctor[]> {
        const doctors = await DoctorDto.find()
            .populate('user')
            .populate('hospital');
        return doctors.map((doctor) => Doctor.fromObject(doctor.toJSON()));
    }

    async saveDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const { name } = createDoctorDto;
        const doctorExist = await DoctorDto.findOne({ name });
        if (doctorExist) {
            throw BussinesException.conflict(
                `Doctor with name: ${name} already exist`
            );
        }
        try {
            const doctorDto = new DoctorDto(createDoctorDto);
            const savedDoctor = await doctorDto.save();
            return Doctor.fromObject(savedDoctor.toJSON());
        } catch (error) {
            throw TechnicalException.internalServerError(`Error: ${error}`);
        }
    }

    async updateDoctor(id: string, doctor: Doctor): Promise<Doctor> {
        const doctorExists = await DoctorDto.findByIdAndUpdate(id, doctor, {
            new: true,
        });
        if (!doctorExists) {
            throw BussinesException.notFound(`Doctor wiht id: ${id} not found`);
        }
        return Doctor.fromObject(doctorExists.toJSON());
    }

    async deleteDoctor(id: string): Promise<boolean> {
        const result = await DoctorDto.findByIdAndDelete(id);
        if (!result) {
            throw BussinesException.notFound(`Doctor wiht id: ${id} not found`);
        }
        return true;
    }
}
