import { NextFunction, Request, Response } from "express";
import { HospitalUseCase } from "../../../domain/usecases/hospital/hospital.usecase";

export class HospitalController{
    constructor(private readonly hospitalUseCase: HospitalUseCase) {
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        this.hospitalUseCase
            .getAll()
            .then((hospitals) => res.status(200).json(hospitals))
            .catch((err) => next(err));
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        this.hospitalUseCase
            .getOne(id)
            .then((hospital) => res.status(200).json(hospital))
            .catch((err) => next(err));
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const hospital = req.body;
        this.hospitalUseCase
            .create(hospital)
            .then((hospital) => res.status(201).json(hospital))
            .catch((err) => next(err));
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const hospital = req.body;
        this.hospitalUseCase
            .update(id, hospital)
            .then((hospital) => res.status(200).json(hospital))
            .catch((err) => next(err));
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        this.hospitalUseCase
            .delete(id)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    }
}