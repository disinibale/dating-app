import express, { Express } from "express"

import routes from './app/routes/main.route';
import connection from "./database/connection"

import errorHandler from './app/middlewares/errorHandler.middleware';
import requestLog from './app/middlewares/requestLog.middleware';


export default async function createServer(): Promise<Express> {
    const app: Express = express()
    app.use(express.json())

    app.use(requestLog);
    app.use('/api/v1/', routes);
    app.use(errorHandler);

    await connection.sync()

    return app
}