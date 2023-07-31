import jwt from 'jsonwebtoken'
import { Config } from '../../config/config';

const config = Config.getAppConfig()

export async function generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, config.jwtSecret, { algorithm: 'HS256', expiresIn: '2h' })
}

export function verifyToken(token: string): string | null {
    try {
        return jwt.verify(token, config.jwtSecret) as string
    } catch (err) {
        return null
    }
}