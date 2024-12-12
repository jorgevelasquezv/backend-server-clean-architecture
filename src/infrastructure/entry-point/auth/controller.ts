import { NextFunction, Request, Response } from 'express';
import { AuthUsecase } from '@domain/usecases/auth/auth.usecase';

export class AuthController{
    constructor(private readonly authUsecase: AuthUsecase) {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.renewToken = this.renewToken.bind(this);
     }
    
    async login(req: Request, res: Response, next: NextFunction) {
        const login = req.body;
        this.authUsecase
            .login(login)
            .then((auth) => res.status(200).json(auth))
            .catch((err) => next(err));
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const user = req.body;
        this.authUsecase
            .register(user)
            .then((user) => res.status(201).json(user))
            .catch((err) => next(err));
    }

    async renewToken(req: Request, res: Response, next: NextFunction) {
        const token = req.body.token;
        this.authUsecase
            .renewToken(token)
            .then((auth) => res.status(200).json(auth))
            .catch((err) => next(err));
    }
}