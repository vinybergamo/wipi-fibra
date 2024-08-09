import { Admins } from "@/entity/admin"
import { Consults } from "@/entity/consults"
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js"

let dataSource: DataSource | null = null;
export const connectDatabase = async () => {
    if (!dataSource?.isInitialized) {
        dataSource = new DataSource({
            type: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: false,
            logging: false,
            entities: [Consults, Admins],
            extra: {
                max: 10,
                idleTimeoutMillis: 30000,
            },
        } as PostgresConnectionOptions);

        await dataSource.initialize();
        console.log("TypeORM connected");
    }
    return dataSource
};

export const getConnection = async () => {
    if (!dataSource?.isInitialized) {
        throw new Error("DataSource not initialized");
    }
    return dataSource;
};
