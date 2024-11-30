import { Request, Response } from 'express';
import { UserUseCase } from '../../../domain/usecases/user/user.usecase';
import { BussinesException } from '../../../domain/model/exceptions/bussines.exception';
import { TechnicalException } from '../../../domain/model/exceptions/technical.exception';

export class UserController {
    constructor(private readonly useuserUseCase: UserUseCase) {}

    async getAll(req: Request, res: Response) {
        this.useuserUseCase
            .getAll()
            .then((users) => res.status(200).json(users))
            .catch((error) => this.handlerError(error, res));
    }

    async getOne(req: Request, res: Response) {
        const id = req.params.id;
        this.useuserUseCase
            .getOne(id)
            .then((user) => res.status(200).json(user))
            .catch((error) => this.handlerError(error, res));
    }

    async create(req: Request, res: Response) {
            const user = req.body;
            this.useuserUseCase
                .create(user)
                .then((user) => res.status(201).json(user))
                .catch((error) => this.handlerError(error, res));
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const user = req.body;
        this.useuserUseCase
            .update(id, user)
            .then((user) => res.status(200).json(user))
            .catch((error) => this.handlerError(error, res));
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        this.useuserUseCase
            .delete(id)
            .then(() => res.status(204).send())
            .catch((error) => this.handlerError(error, res));
    }

    private readonly handlerError = (error: any, res: Response) => {
        if (error instanceof BussinesException)
            return res.status(error.statusCode).json({ error: error.message });
        console.log(error, 'este error');
        if (error instanceof TechnicalException) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    };
}
