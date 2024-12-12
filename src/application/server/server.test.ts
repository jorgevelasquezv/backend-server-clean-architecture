import request from 'supertest';
import express, { Request, Response, Router } from 'express';
import { Server } from './server';

describe('Server', () => {
    let server: Server;
    let app: express.Application;
    let router: Router;

    beforeEach(() => {
        router = Router();
        router.get('/test', (req: Request, res: Response) => {
            res.send('Test route');
        });
        server = new Server({ port: 3000, routes: router });
        app = server.app;
    });

    afterEach(() => {
        server.close();
    });

    it('should start the server and respond to a route', async () => {
        await server.start();
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Test route');
    });

    it('should serve static files if publicPath is provided', async () => {
        server = new Server({
            port: 3000,
            publicPath: 'public',
            routes: router,
        });
        app = server.app;
        await server.start();
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('html');
    });

    it('should handle global errors', async () => {
        router.get('/error', (req, res) => {
            res.status(500).send({ message: 'Test error' });
        });
        await server.start();
        const response = await request(app).get('/error');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Test error');
    });

    it('should close the server', async () => {
        await server.start();
        server.close();
        expect(server['serverListener'].listening).toBe(false);
    });
});
