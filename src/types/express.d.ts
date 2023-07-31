declare global {
    namespace Express {
        export interface Request {
            user?: {
                userId?: number | undefined
                email?: string | undefined
                fullname?: string | undefined
                iat?: number | undefined
                exp?: number | undefined
            } | undefined | null
        }
    }
}