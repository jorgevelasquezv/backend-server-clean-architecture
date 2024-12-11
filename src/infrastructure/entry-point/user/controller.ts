import { UserUseCase } from '@domain/usecases/user/user.usecase';
import { NextFunction, Request, Response } from 'express';

export class UserController {
    constructor(private readonly userUseCase: UserUseCase) {
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.login = this.login.bind(this);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        this.userUseCase
            .getAll()
            .then((users) => res.status(200).json(users))
            .catch((err) => next(err));
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        this.userUseCase
            .getOne(id)
            .then((user) => res.status(200).json(user))
            .catch((err) => next(err));
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const user = req.body;
        this.userUseCase
            .create(user)
            .then((user) => res.status(201).json(user))
            .catch((err) => next(err));
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const user = req.body;
        this.userUseCase
            .update(id, user)
            .then((user) => res.status(200).json(user))
            .catch((err) => next(err));
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        this.userUseCase
            .delete(id)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const login = req.body;
        this.userUseCase
            .login(login)
            .then((token) => res.status(200).json(token))
            .catch((err) => next(err));
    }
}
