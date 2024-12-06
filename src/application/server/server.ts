import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';
import { globalErrorHandler } from '@application/middlewares/global-error-handler.middleware';

interface Options {
    port: number;
    publicPath?: string;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath?: string;
    private readonly routes: Router;

    constructor(private readonly options: Options) {
        const { port, publicPath, routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        // Routes
        this.app.use(this.routes);

        // Middleware Global Handler Error
        this.app.use(globalErrorHandler);

        // Public folder
        if (this.publicPath) {
            this.app.use(express.static(this.publicPath));
        }

        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(
                __dirname,
                `../../${this.publicPath}/index.html`
            );
            res.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public close() {
        this.serverListener.close();
    }
}
