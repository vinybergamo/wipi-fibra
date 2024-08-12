import "reflect-metadata";
import { Admin } from "./entities/admin";
import { Consult } from "./entities/consults";
import { DataSource } from "typeorm";

export const connection = new Map()
connection.set('postgres', new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV !== "production",
    logging: false,
    entities: [Consult, Admin],
    schema: 'public',
    extra: {
        max: 10,
        idleTimeoutMillis: 30000,
    },
}))

export const ensureConnection = async (
): Promise<boolean> => {
    const dataSource = connection.get('postgres')
    if (dataSource.isInitialized) {
        return dataSource.isInitialized;
    }
    await dataSource.initialize();
    return dataSource.isInitialized
};

export default ensureConnection;