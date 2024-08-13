import "reflect-metadata";
import { Admin } from "./entities/admin";
import { Consult } from "./entities/consults";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV !== "production",
    logging: false,
    entities: [Consult, Admin],
    schema: 'public',
})

export default AppDataSource;
