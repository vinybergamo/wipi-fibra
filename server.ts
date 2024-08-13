import 'reflect-metadata';
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import AppDataSource from './src/database';

import dotenv from 'dotenv';
dotenv.config();
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        handle(req, res, parsedUrl)
    }).listen(port)
    try {
        console.log(AppDataSource.isInitialized)
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!', AppDataSource.isInitialized);
    } catch (err) {
        console.error('Error starting server:', err);
    }

    console.log(
        `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
        }`
    )
})




// import 'reflect-metadata';
// import express, { Request, Response } from 'express';
// import next from 'next';
// import { DataSource } from 'typeorm';
// import { Admin } from './src/database/entities/admin/admin';
// import { Consult } from './src/database/entities/consults/consults';
// import dotenv from 'dotenv';
// dotenv.config();

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.POSTGRES_HOST,
//     port: parseInt(process.env.POSTGRES_PORT,10),
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     synchronize: process.env.NODE_ENV !== "production",
//     logging: true,
//     entities: [Consult, Admin],
//     schema: 'public',
// })

// app.prepare().then(async () => {
//     console.log('initializing express')
//     try {
//         // Inicialize a conexão
//         await AppDataSource.initialize();
//         console.log('Data Source has been initialized!');

//         const server = express();

//         // Middleware para parsing do body
//         server.use(express.json());

//         // Rotas de salvamento no Express
//         server.post('/save-data', async (req: Request, res: Response) => {
//             const data = req.body;
//             const repository = AppDataSource.getRepository(Consult);
//             const savedEntity = await repository.save(data);
//             res.status(200).json({ message: 'Data saved successfully', entity: savedEntity });
//         });

//         // Lida com todas as outras rotas
//         server.all('*', (req: Request, res: Response) => {
//             return handle(req, res);
//         });

//         const PORT = process.env.PORT || 3000;
//         server.listen(PORT, (err?: any) => {
//             if (err) throw err;
//             console.log(`> Server ready on http://localhost:${PORT}`);
//         });
//     } catch (err) {
//         console.error('Error starting server:', err);
//     }
// }).catch((err) => {
//     console.error('Error preparing the app:', err);
// });
