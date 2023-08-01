export {}
declare global {
    namespace Express {
        export interface Request {
            user?: {
                userId?: number
                email?: string
                fullname?: string
                iat?: number
                exp?: number
            } | null
        }
    }
}