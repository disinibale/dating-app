import { Sequelize } from "sequelize-typescript";
import { Config } from "../config/config";

import Models from "../models/";

const databaseConfig = Config.getDatabaseConfig()

export default new Sequelize({
    ...databaseConfig,
    models: Models,
    storage: '',
})