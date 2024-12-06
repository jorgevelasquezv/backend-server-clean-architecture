import { Router } from "express";
import { DoctorUseCase } from "../../../domain/usecases/doctor/doctor.usecases";
import { DoctorController } from "./controller";
import { validateObjectId } from "../../middlewares/valid-id.middleware";
import { DoctorAdapterMongoRepository } from "../../adapters/doctor/doctor-adapter.mongo";

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