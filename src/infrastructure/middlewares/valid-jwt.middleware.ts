import { jwtadpter } from '@application/config';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { NextFunction, Request, Response } from 'express';

export function validJwt(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) {
        return next(BussinesException.unauthorized('Token is required'));
    }

    const paylod = jwtadpter.verify(token.replace('Bearer ', ''));

    if (!paylod) {
        return next(BussinesException.unauthorized('Invalid token'));
    }

    req.body.id = paylod.id;

    next();
}
