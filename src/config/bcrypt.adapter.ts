import { compare, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptadapter = {
    hash: (password: string) => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    },

    compare: (password: string, hash: string) => {
        return compare(password, hash);
    }
}