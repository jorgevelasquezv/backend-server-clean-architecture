import { sign, verify } from 'jsonwebtoken';
import { envs } from './envs';

type JwtPayload = {
    id: string;
    iat: number;
    exp: number;
};

const secret = envs.JWT_SECRET;
const expiresIn = envs.JWT_EXPIRES;

export const jwtadpter = {
    sign: (id: string): string => {
        const payload = { id };
        return sign(payload, secret, { expiresIn });
    },
    verify: (token: string) => {
        return verify(token, secret, { ignoreExpiration: false }) as JwtPayload;
    },
};
