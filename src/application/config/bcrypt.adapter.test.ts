import { bcryptadapter } from './bcrypt.adapter';
import { compare, genSaltSync, hashSync } from 'bcryptjs';

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
    genSaltSync: jest.fn(),
    hashSync: jest.fn(),
}));

describe('bcryptadapter', () => {
    describe('hash', () => {
        it('should hash the password', () => {
            const password = 'password123';
            const salt = 'randomSalt';
            const hashedPassword = 'hashedPassword123';

            (genSaltSync as jest.Mock).mockReturnValue(salt);
            (hashSync as jest.Mock).mockReturnValue(hashedPassword);

            const result = bcryptadapter.hash(password);

            expect(genSaltSync).toHaveBeenCalledWith(10);
            expect(hashSync).toHaveBeenCalledWith(password, salt);
            expect(result).toBe(hashedPassword);
        });
    });

    describe('compare', () => {
        it('should compare the password with the hash', async () => {
            const password = 'password123';
            const hash = 'hashedPassword123';
            const comparisonResult = true;

            (compare as jest.Mock).mockResolvedValue(comparisonResult);

            const result = await bcryptadapter.compare(password, hash);

            expect(compare).toHaveBeenCalledWith(password, hash);
            expect(result).toBe(comparisonResult);
        });

        it('should return false if the comparison fails', async () => {
            const password = 'password123';
            const hash = 'hashedPassword123';
            const comparisonResult = false;

            (compare as jest.Mock).mockResolvedValue(comparisonResult);

            const result = await bcryptadapter.compare(password, hash);

            expect(compare).toHaveBeenCalledWith(password, hash);
            expect(result).toBe(comparisonResult);
        });
    });
});
