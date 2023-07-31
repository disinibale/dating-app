import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import UnauthorizedException from '../exceptions/clientException/unauthorized.exception';
import { DecodedJwtPayload } from './interfaces/auth.interface';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedException('Resource Unauthorized')

    const token = authorization.split(' ')[1]
    const decodedToken = verifyToken(token) as DecodedJwtPayload

    if (!decodedToken) throw new UnauthorizedException('Invalid or Expired token!')

    req.user = decodedToken

    next()
}