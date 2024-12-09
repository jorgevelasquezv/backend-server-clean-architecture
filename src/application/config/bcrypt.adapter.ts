import { compare, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptadapter = {
    hash: (password: string): string => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    },

    compare: (password: string, hash: string): Promise<boolean> => {
        return compare(password, hash);
    },
};