import { DoctorDto } from '@database/models/doctor.model';
import { Doctor } from '@domain/model/doctor/doctor.model';
import { DoctorGateway } from '@domain/model/doctor/gateway/doctor.gateway';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { TechnicalException } from '@domain/model/exceptions/technical.exception';
import { HospitalDto } from '@database/models/hospital.model';
import { CreateDoctorRequest, UpdateDoctorRequest } from '@domain/model/doctor';

export class DoctorAdapterMongoRepository implements DoctorGateway {
    async getDoctorById(id: string): Promise<Doctor> {
        const doctor = await DoctorDto.findById(id).populate([
            'user',
            'hospital',
        ]);
        if (!doctor) {
            throw BussinesException.notFound(`Doctor wiht id: ${id} not found`);
        }
        return Doctor.fromObject(doctor.toJSON());
    }

    async getDoctorByEmail(email: string): Promise<Doctor> {
        const doctor = await DoctorDto.findOne({ user: { email } }).populate([
            'user',
            'hospital',
        ]);
        if (!doctor) {
            throw BussinesException.notFound(
                `Doctor wiht email: ${email} not found`
            );
        }
        return Doctor.fromObject(doctor.toJSON());
    }

    async getDoctors(): Promise<Doctor[]> {
        const doctors = await DoctorDto.find().populate(['user', 'hospital']);
        return doctors.map((doctor) => Doctor.fromObject(doctor.toJSON()));
    }

    async saveDoctor(
        createDoctorRequest: CreateDoctorRequest
    ): Promise<Doctor> {
        const { name } = createDoctorRequest;

        const hospitalExist = await HospitalDto.findById(
            createDoctorRequest.hospital
        );
        if (!hospitalExist) {
            throw BussinesException.badRequest(
                `Hospital with id: ${createDoctorRequest.hospital} not exist`
            );
        }

        const doctorExist = await DoctorDto.findOne({ name });
        if (doctorExist) {
            throw BussinesException.conflict(
                `Doctor with name: ${name} already exist`
            );
        }
        try {
            const doctorDto = new DoctorDto(createDoctorRequest);
            const savedDoctor = await doctorDto.save();
            const doctorResponse = await savedDoctor.populate([
                'user',
                'hospital',
            ]);
            return Doctor.fromObject(doctorResponse.toJSON());
        } catch (error) {
            throw TechnicalException.internalServerError(`Error: ${error}`);
        }
    }

    async updateDoctor(
        id: string,
        updateDoctorRequest: UpdateDoctorRequest
    ): Promise<Doctor> {
        if (updateDoctorRequest.hospital) {
            const hospitalExist = await HospitalDto.findById(
                updateDoctorRequest.hospital
            );
            if (!hospitalExist) {
                throw BussinesException.notFound(
                    `Hospital with id: ${updateDoctorRequest.hospital} not exist`
                );
            }
        }

        const doctorExists = await DoctorDto.findByIdAndUpdate(
            id,
            updateDoctorRequest,
            {
                new: true,
            }
        ).populate(['user', 'hospital']);

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
