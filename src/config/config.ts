import * as dotenv from 'dotenv'
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options'
import { Environment } from './config.type'

dotenv.config()

export class Config {
    public static getEnvVariable(key: string): string {
        const value = process.env[key]
        if (value === undefined) {
            throw new Error(`Environment variable ${key} not found`)
        }

        return value
    }

    public static getDatabaseConfig(): SequelizeOptions {
        return {
            host: Config.getEnvVariable('DB_HOST'),
            port: parseInt(Config.getEnvVariable('DB_PORT'), 10),
            database: Config.getEnvVariable('DB_NAME'),
            schema: Config.getEnvVariable('DB_SCHEMA'),
            username: Config.getEnvVariable('DB_USERNAME'),
            password: Config.getEnvVariable('DB_PASSWORD'),
            dialect: 'postgres',
        }
    }

    public static getAppConfig(): {
        environment: Environment
        port: number
        jwtSecret: string
    } {
        return {
            environment: Config.getEnvVariable('NODE_ENV'),
            port: parseInt(Config.getEnvVariable('PORT')),
            jwtSecret: Config.getEnvVariable('JWT_SECRET'),
        }
    }
}