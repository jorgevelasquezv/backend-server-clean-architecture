export class BussinesException extends Error {
    private constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {
        super(message);
    }

    static badRequest(message: string): BussinesException {
        return new BussinesException(message, 400);
    }

    static notFound(message: string): BussinesException {
        return new BussinesException(message, 404);
    }

    static conflict(message: string): BussinesException {
        return new BussinesException(message, 409);
    }

    static unauthorized(message: string): BussinesException {
        return new BussinesException(message, 401);
    }

    static forbidden(message: string): BussinesException {
        return new BussinesException(message, 403);
    }
}
