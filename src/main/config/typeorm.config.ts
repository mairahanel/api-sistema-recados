import { DataSource } from "typeorm";
import 'dotenv/config';

export default new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: false,
    schema: "public",
    entities: ["src/app/shared/entities/**/*.ts"],
    migrations: ["src/app/shared/migrations/**/*.ts"]

});