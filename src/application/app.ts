import { MongoDataBase } from '../../database/mongo-database';
import { envs } from './config/envs';
import { AppRoutes } from './server/routes';
import { Server } from './server/server';

(() => main())();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.DB_HOST,
        dbName: envs.DB_NAME,
    });

    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    server.start();
}
