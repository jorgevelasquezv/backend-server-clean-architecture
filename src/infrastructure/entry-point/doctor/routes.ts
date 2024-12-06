import { Router } from "express";
import { DoctorAdapterMongoRepository } from "@infrastructure/adapters/doctor/doctor-adapter.mongo";
import { DoctorUseCase } from "@domain/usecases/doctor/doctor.usecases";
import { DoctorController } from "./controller";
import { validateObjectId } from "@infrastructure/middlewares/valid-id.middleware";


export class DoctorRoutes{
    static get routes(){
        const router = Router();

        const doctorGateway = new DoctorAdapterMongoRepository();
        const doctorUseCase = new DoctorUseCase(doctorGateway);
        const controller = new DoctorController(doctorUseCase);

        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.get('/:id', validateObjectId, controller.getOne);
        router.put('/:id', validateObjectId, controller.update);
        router.delete('/:id', validateObjectId, controller.delete);

        return router;
    }
}