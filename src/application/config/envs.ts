import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
};
