import { DataSource } from 'typeorm';
import 'dotenv/config';
import typeormConfig from './config';


export class DatabaseConnection {
    private static _connection: DataSource;

    public static async connect() {
        if(!this._connection) {
            this._connection = await typeormConfig.initialize();
        }
    }

    public static get connection() {
        return this._connection;
    }
}