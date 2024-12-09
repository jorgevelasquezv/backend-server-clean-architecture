import { Request, Response, NextFunction } from 'express';
import { globalErrorHandler } from './global-error-handler.middleware';
import { BussinesException } from '@domain/model/exceptions/bussines.exception';
import { TechnicalException } from '@domain/model/exceptions/technical.exception';

describe('globalErrorHandler', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should handle BussinesException and return the correct response', () => {
        const error = BussinesException.badRequest('Business error');

        globalErrorHandler(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Business error' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle TechnicalException and return the correct response', () => {
        const error = TechnicalException.internalServerError('Technical error');

        globalErrorHandler(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Technical error' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle unknown errors and return 500 response', () => {
        const error = new Error('Unknown error');

        globalErrorHandler(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        expect(next).toHaveBeenCalled();
    });
});