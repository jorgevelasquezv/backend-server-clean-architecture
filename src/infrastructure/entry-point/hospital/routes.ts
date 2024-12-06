import { Router } from "express";
import { HospitalAdapterMongoRepository } from "@infrastructure/adapters/hospital/hospital-adapter.mongo";
import { HospitalUseCase } from "@domain/usecases/hospital/hospital.usecase";
import { HospitalController } from "./controller";
import { validateObjectId } from "@infrastructure/middlewares/valid-id.middleware";


export class HospitalRoutes{
    static get routes(): Router {
        const router = Router();

        const hospitalGateway = new HospitalAdapterMongoRepository();
        const hospitalUseCase = new HospitalUseCase(hospitalGateway);
        const controller = new HospitalController(hospitalUseCase);

        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.get('/:id', validateObjectId, controller.getOne);
        router.put('/:id', validateObjectId, controller.update);
        router.delete('/:id', validateObjectId, controller.delete);

        return router;
    }
}