import { NextFunction, Request, Response } from 'express';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import mongoose from 'mongoose';

export function validateObjectId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    if (!id) {
        return next(BussinesException.badRequest('Id is required'));
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(BussinesException.badRequest('Invalid id'));
    } else {
        next();
    }
}
