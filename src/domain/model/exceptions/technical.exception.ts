export class TechnicalException extends Error {
    private constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {
        super(message);
    }

    static internalServerError(message: string): TechnicalException {
        return new TechnicalException(message, 500);
    }
}