import { HospitalGateway } from '@domain/model/hospital/gateway/hospital-gateway';
import { Error } from 'mongoose';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from '@domain/model/hospital/hospital.model';
import { HospitalDto } from '@database/models/hospital.model';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { TechnicalException } from '@domain/model/exceptions/technical.exception';
import { UpdateHospitalDto } from './dto/update-hospital.dto';


export class HospitalAdapterMongoRepository implements HospitalGateway {
    async createHospital(
        createHospitalDto: CreateHospitalDto
    ): Promise<Hospital> {
        const hospital = CreateHospitalDto.create(createHospitalDto);

        const { name } = hospital;

        const HospitalExist = await HospitalDto.findOne({ name });

        if (HospitalExist) {
            throw BussinesException.conflict(
                `Hospital with name: ${name} already exist`
            );
        }

        try {
            const hospitalDto = new HospitalDto(hospital);

            await hospitalDto.save();

            const savedHospital = await hospitalDto.save();
            return Hospital.fromObject(savedHospital.toJSON());
        } catch (error) {
            throw TechnicalException.internalServerError(`Error: ${error}`);
        }
    }

    async updateHospital(
        id: string,
        updateHospitalDto: UpdateHospitalDto
    ): Promise<Hospital> {
        try {
            const updatedHospital = await HospitalDto.findByIdAndUpdate(
                id,
                updateHospitalDto,
                {
                    new: true,
                }
            );

            if (!updatedHospital) {
                throw BussinesException.notFound(
                    `Hospital wiht id: ${id} not found`
                );
            }

            return Hospital.fromObject(updatedHospital.toJSON());
        } catch (error) {
            if (error instanceof Error.CastError) {
                throw BussinesException.badRequest(
                    `User id: ${updateHospitalDto.user} is invalid`
                );
            }

            if (error instanceof Error.ValidationError) {
                throw BussinesException.badRequest(
                    `Hospital data is invalid: ${error.message}`
                );
            }

            throw TechnicalException.internalServerError(`Error: ${error}`);
            
        }
    }

    async deleteHospital(id: string): Promise<boolean> {
        const result = await HospitalDto.findByIdAndDelete(id);
        if (!result) {
            throw BussinesException.notFound(
                `Hospital wiht id: ${id} not found`
            );
        }
        return true;
    }

    async getHospitalById(id: string): Promise<Hospital> {
        const hospitalDto = await HospitalDto.findById(id).populate('user');
        if (!hospitalDto) {
            throw BussinesException.notFound(
                `Hospital wiht id: ${id} not found`
            );
        }
        return Hospital.fromObject(hospitalDto);
    }

    async getHospitals(): Promise<Hospital[]> {
        const hospitalsDto = await HospitalDto.find().populate('user');
        return hospitalsDto.map((hospitalDto) =>
            Hospital.fromObject(hospitalDto)
        );
    }
}
