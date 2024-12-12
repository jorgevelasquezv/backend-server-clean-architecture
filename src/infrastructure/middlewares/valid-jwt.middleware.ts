import { jwtadpter } from '@application/config';
import { UserDto } from '@database/models/user.model';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { NextFunction, Request, Response } from 'express';

export async function validJwt(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) {
        return next(BussinesException.unauthorized('Token is required'));
    }

    const paylod = jwtadpter.verify(token.replace('Bearer ', ''));

    if (!paylod) {
        return next(BussinesException.unauthorized('Invalid token'));
    }

    const userExist = await UserDto.findById(paylod.id);
    if (!userExist) {
        return next(BussinesException.unauthorized('Invalid token'));
    }
    
    req.headers['user'] = paylod.id;

    next();
}
