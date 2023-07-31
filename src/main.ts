import 'reflect-metadata';

import logger from './logger';
import createServer from './server';
import { Config } from './config/config';

const appConfig = Config.getAppConfig();

async function serverListener(port: number) {
    const app = await createServer()

    app.listen(port, () => {
        logger.info(`Connected to port ${port}`);
    });
}

serverListener(appConfig.port)