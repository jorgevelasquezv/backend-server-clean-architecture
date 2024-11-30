import mongoose from 'mongoose';

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static async connect(options: Options): Promise<boolean> {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, { dbName });
            console.log('Database connected');
            return true;
        } catch (error) {
            console.log('Error connecting to the database', error);
            throw error;
        }
    }

    static async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}
