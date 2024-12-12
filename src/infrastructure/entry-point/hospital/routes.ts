import { Router } from 'express';
import { HospitalAdapterMongoRepository } from '@infrastructure/adapters/hospital/hospital-adapter.mongo';
import { HospitalUseCase } from '@domain/usecases/hospital/hospital.usecase';
import { HospitalController } from './controller';
import { validateObjectId } from '@infrastructure/middlewares/valid-id.middleware';
import { validJwt } from '@infrastructure/middlewares/valid-jwt.middleware';

export class HospitalRoutes {
    static get routes(): Router {
        const router = Router();

        const hospitalGateway = new HospitalAdapterMongoRepository();
        const hospitalUseCase = new HospitalUseCase(hospitalGateway);
        const controller = new HospitalController(hospitalUseCase);

        router.get('/', validJwt, controller.getAll);
        router.post('/', validJwt, controller.create);
        router.get('/:id', [validJwt, validateObjectId], controller.getOne);
        router.put('/:id', [validJwt, validateObjectId], controller.update);
        router.delete('/:id', [validJwt, validateObjectId], controller.delete);

        return router;
    }
}
