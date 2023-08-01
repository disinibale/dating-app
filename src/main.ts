import 'reflect-metadata';

import { Config } from './config/config';

import logger from './logger';
import errorHandler from './app/middlewares/errorHandler.middleware';
import createServer from './server';

const appConfig = Config.getAppConfig();

async function serverListener(port: number) {
    const app = await createServer()
    app.use(errorHandler);
    app.listen(port, () => {
        logger.info(`Connected to port ${port}`);
    });
}

serverListener(appConfig.port)