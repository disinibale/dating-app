class UnauthorizedException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'CLIENT-UNAUTHORIZED'
    }
}

export default UnauthorizedException