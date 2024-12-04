import { NextFunction, Request, Response } from 'express';
import { BussinesException } from '../../domain/model/exceptions/bussines.exception';
import { TechnicalException } from '../../domain/model/exceptions/technical.exception';

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof BussinesException) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    if (err instanceof TechnicalException) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    console.log(err);
    res.status(500).json({ error: 'Internal server error' });

    next();
}
