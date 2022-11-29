import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes.routes';
import 'reflect-metadata';
import { DatabaseConnection } from './database/config/connection';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

DatabaseConnection.connect().then(() => {
    console.log("Database foi inicializada");

    app.listen(process.env.PORT, () => {
        console.log("API rodando na porta " + process.env.PORT);
    })
});

//    app.listen(3000, () => {
//    console.log("API rodando...");
//})

