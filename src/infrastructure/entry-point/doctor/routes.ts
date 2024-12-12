import { Router } from 'express';
import { validJwt } from '@infrastructure/middlewares/valid-jwt.middleware';
import { DoctorAdapterMongoRepository } from '@infrastructure/adapters/doctor/doctor-adapter.mongo';
import { DoctorUseCase } from '@domain/usecases/doctor/doctor.usecases';
import { DoctorController } from './controller';
import { validateObjectId } from '@infrastructure/middlewares/valid-id.middleware';

export class DoctorRoutes {
    static get routes() {
        const router = Router();

        const doctorGateway = new DoctorAdapterMongoRepository();
        const doctorUseCase = new DoctorUseCase(doctorGateway);
        const controller = new DoctorController(doctorUseCase);

        router.get('/', validJwt, controller.getAll);
        router.post('/', validJwt, controller.create);
        router.get('/:id', [validJwt, validateObjectId], controller.getOne);
        router.put('/:id', [validJwt, validateObjectId], controller.update);
        router.delete('/:id', [validJwt, validateObjectId], controller.delete);

        return router;
    }
}
