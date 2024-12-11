import { Router } from 'express';
import { UserUseCase } from '@domain/usecases/user/user.usecase';
import { UserAdpterMongoRepository } from '@infrastructure/adapters/user/user-adapter.mongo';
import { UserController } from './controller';
import { validateObjectId } from '@infrastructure/middlewares/valid-id.middleware';

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const userGateway = new UserAdpterMongoRepository();
        const userUseCase = new UserUseCase(userGateway);
        const controller = new UserController(userUseCase);

        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.post('/login', controller.login);
        router.get('/:id', validateObjectId, controller.getOne);
        router.put('/:id', validateObjectId, controller.update);
        router.delete('/:id', validateObjectId, controller.delete);

        return router;
    }
}
