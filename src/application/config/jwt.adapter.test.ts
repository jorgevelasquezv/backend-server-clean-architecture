import { jwtadpter } from './jwt.adapter';
import { envs } from './envs';
import { sign, verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));

describe('jwtadpter', () => {
    const id = 'test-id';
    const token = 'test-token';
    const payload = { id };
    const jwtPayload = { id, iat: 123456, exp: 123456 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('sign', () => {
        it('should sign a token with the given id', () => {
            (sign as jest.Mock).mockReturnValue(token);

            const result = jwtadpter.sign(id);

            expect(sign).toHaveBeenCalledWith(payload, envs.JWT_SECRET, { expiresIn: envs.JWT_EXPIRES });
            expect(result).toBe(token);
        });
    });

    describe('verify', () => {
        it('should verify a token and return the payload', () => {
            (verify as jest.Mock).mockReturnValue(jwtPayload);

            const result = jwtadpter.verify(token);

            expect(verify).toHaveBeenCalledWith(token, envs.JWT_SECRET);
            expect(result).toEqual(jwtPayload);
        });

        it('should throw an error if the token is invalid', () => {
            (verify as jest.Mock).mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => jwtadpter.verify(token)).toThrow('Invalid token');
        });
    });
});