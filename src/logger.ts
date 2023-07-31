import { createLogger, format, transports } from "winston";
import { Config } from "./config/config";
import clc from 'cli-color'

const logger = createLogger({
    level: Config.getAppConfig().environment === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.align(),
        format.label({
            label: 'API'
        }),
        format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        format.printf((info) => {
            const { level } = info
            let coloredLevel

            if (level === 'info') {
                coloredLevel = clc.cyanBright(level.toUpperCase())
            } else if (level === 'warn') {
                coloredLevel = clc.yellow(level.toUpperCase())
            } else if (level === 'http') {
                coloredLevel = clc.green(level.toUpperCase())
            } else {
                coloredLevel = clc.red(level.toUpperCase())
            }

            return `[${ coloredLevel }]:${info.message}`
        })
    ),
    transports: [
        new transports.Console(),
    ]
})

export default logger