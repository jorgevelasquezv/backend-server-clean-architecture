import { DoctorUseCase } from "@domain/usecases/doctor/doctor.usecases";
import { NextFunction, Request, Response } from "express";

export class DoctorController{
    constructor(private readonly doctorUseCase: DoctorUseCase){
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        this.doctorUseCase
            .getAll()
            .then((doctors) => res.status(200).json(doctors))
            .catch((err) => next(err));
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        this.doctorUseCase
            .getOne(id)
            .then((doctor) => res.status(200).json(doctor))
            .catch((err) => next(err));
    }

    async create(req: Request, res: Response, next: NextFunction){
        const doctor = req.body;
        doctor.user = req.headers['user'];
        this.doctorUseCase
            .create(doctor)
            .then((doctor) => res.status(201).json(doctor))
            .catch((err) => next(err));
    }

    async update(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const doctor = req.body;
        doctor.user = req.headers['user'];
        this.doctorUseCase
            .update(id, doctor)
            .then((doctor) => res.status(200).json(doctor))
            .catch((err) => next(err));
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        this.doctorUseCase
            .delete(id)
            .then(() => res.status(204).send())
            .catch((err) => next(err));
    }
}