import express, { Express } from "express"

import connection from "./database/connection"
import routes from './app/routes/main.route';
import requestLog from './app/middlewares/requestLog.middleware';
import errorHandler from './app/middlewares/errorHandler.middleware';

export default async function createServer(): Promise<Express> {
    const app: Express = express()
    await connection.sync()
    app.use(express.json())
    app.use(requestLog);
    
    app.use('/api/v1/', routes);
    
    app.use(errorHandler);
    return app
}