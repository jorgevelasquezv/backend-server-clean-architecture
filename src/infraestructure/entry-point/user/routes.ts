import { UserUseCase } from './../../../domain/usecases/user/user.usecase';
import { Router } from "express";
import { UserController } from "./controller";
import { UserAdpterMongoRepository } from '../../adapters/user-adapter.mongo';

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const userGateway = new UserAdpterMongoRepository();
        const userUseCase = new UserUseCase(userGateway);
        const controller = new UserController(userUseCase);

        router.get('/', controller.getAll);
        router.get('/:id', controller.getOne);
        router.post('/', controller.create);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}