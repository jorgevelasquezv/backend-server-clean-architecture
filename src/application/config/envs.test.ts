describe('envs', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules(); 
        process.env = { ...originalEnv };

        process.env.PORT = '3001';
        process.env.DB_HOST = 'localhost';
        process.env.DB_NAME = 'test';
        process.env.PUBLIC_PATH = 'public';
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should return the environment variables', () => {
        const { envs } = require('./envs');

        expect(envs.PORT).toBe(3001);
        expect(envs.DB_HOST).toBe('localhost');
        expect(envs.DB_NAME).toBe('test');
        expect(envs.PUBLIC_PATH).toBe('public');
    });

    it('should throw an error if the environment variables are not set', () => {
        process.env.PORT = '3001';
        process.env.DB_HOST = undefined;
        process.env.DB_NAME = undefined;
        process.env.PUBLIC_PATH = undefined;

        const loadEnvs = () => require('./envs');

        expect(loadEnvs).toThrow();
    });
});
