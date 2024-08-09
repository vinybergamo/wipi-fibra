import { Admins } from "@/entity/admin"
import { Consults } from "@/entity/consults"
import { Connection, getConnectionManager } from "typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js"

let connection: Connection
export const connectDatabase = async () => {
    const connectionManager = getConnectionManager()
    if (connectionManager.has('default')) {
        connection = connectionManager.get('default')
    } else {
        connection = connectionManager.create({
            type: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: false,
            logging: false,
            entities: [Consults, Admins],
        } as PostgresConnectionOptions);
        await connection.connect()
        console.log('typeorm connected')
    }
}
export const getConnection = async () => {
    if (!connection) {
        throw new Error('Connection not established')
    }
    return connection
}