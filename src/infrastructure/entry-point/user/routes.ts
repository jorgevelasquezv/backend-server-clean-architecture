import { Router } from 'express';
import { UserUseCase } from '@domain/usecases/user/user.usecase';
import { UserAdpterMongoRepository } from '@infrastructure/adapters/user/user-adapter.mongo';
import { UserController } from './controller';
import { validateObjectId } from '@infrastructure/middlewares/valid-id.middleware';
import { validJwt } from '@infrastructure/middlewares/valid-jwt.middleware';

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const userGateway = new UserAdpterMongoRepository();
        const userUseCase = new UserUseCase(userGateway);
        const controller = new UserController(userUseCase);

        router.get('/', validJwt, controller.getAll);
        router.post('/', validJwt, controller.create);
        router.get('/:id', [validJwt, validateObjectId], controller.getOne);
        router.put('/:id', [validJwt, validateObjectId], controller.update);
        router.delete('/:id', [validJwt, validateObjectId], controller.delete);

        return router;
    }
}
