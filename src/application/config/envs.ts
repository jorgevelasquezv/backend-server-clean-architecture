import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRES: get('JWT_EXPIRES').required().asString(),
};
