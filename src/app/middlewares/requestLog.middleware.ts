import { Request, Response, NextFunction } from "express"
import clc from 'cli-color'

import logger from "../../logger"

const requestLogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const requestTime: number = new Date().getTime()

    res.on('finish', () => {
        let coloredMethod, coloredCode
        const { method } = req

        const responseTime: number = new Date().getTime() - requestTime
        const statusCode: number = res.statusCode
        const time = new Date()


        let logLevel: string
        if (statusCode >= 500) {
            logLevel = 'error'
            coloredMethod = clc.bgRedBright(method)
            coloredCode = clc.redBright(statusCode)
        } else if (statusCode >= 400) {
            logLevel = 'warn'
            coloredMethod = clc.bgYellowBright(method)
            coloredCode = clc.yellowBright(statusCode)
        } else if (statusCode >= 200) {
            logLevel = 'http'
            coloredMethod = clc.bgGreenBright(method)
            coloredCode = clc.greenBright(statusCode)
        } else {
            logLevel = 'info'
            coloredMethod = clc.bgCyanBright(method)
            coloredCode = clc.cyanBright(statusCode)
        }

        logger.log(logLevel, `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${coloredMethod} - ${responseTime}ms : '${req.get('host')}${req.originalUrl}' : ${coloredCode} source ${req.ip}`)
    })

    next()
}

export default requestLogMiddleware