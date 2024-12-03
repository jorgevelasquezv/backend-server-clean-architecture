import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { BussinesException } from '../../domain/model/exceptions/bussines.exception';

export function validateObjectId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    if (!id) {
        return next(BussinesException.badRequest('Id is required'));
        // res.status(400).json({ error: 'Id is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(BussinesException.badRequest('Invalid id'));
        // res.status(400).json({ error: 'Invalid id' });
    } else {
        next();
    }
}
