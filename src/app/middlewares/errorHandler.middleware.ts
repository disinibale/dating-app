import { NextFunction, Request, Response } from 'express'

import ClientException from '../exceptions/clientException'
import InternalServerException from '../exceptions/serverException/internalServer.exception'

// eslint-disable-next-line
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClientException.BadRequestException) return res.status(400).json({ code: 400, error: err.message })
    if (err instanceof ClientException.UnauthorizedException) return res.status(401).json({ code: 401, error: err.message })
    if (err instanceof ClientException.ForbiddenRequestException) return res.status(403).json({ code: 403, error: err.message })
    if (err instanceof ClientException.NotFoundException) return res.status(404).json({ code: 404, error: err.message })
    if (err instanceof ClientException.ConflictRequestException || err instanceof ClientException.EmailAlreadyRegisteredException) return res.status(409).json({ code: 409, error: err.message })
    if (err instanceof InternalServerException) return res.status(500).json({ code: 500, message: 'Internal Server error', error: err.message })

    return res.status(500).json({ code: 500, message: 'Internal Server error', error: err.message })
}

export default errorHandler