import { AuthUsecase } from '@domain/usecases/auth/auth.usecase';
import { AuthAdapterMongoRepository } from '@infrastructure/adapters/auth/auth-adapter.mongo';
import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authGateway = new AuthAdapterMongoRepository();
        const authUsecase = new AuthUsecase(authGateway);
        const controller = new AuthController(authUsecase);

        router.post('/login', controller.login);
        router.post('/register', controller.register);
        router.post('/renew-token', controller.renewToken);

        return router;
    }
}
