class ForbiddenRequestException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'REQUEST-FORBIDDEN-EXCEPTION'
    }
}

export default ForbiddenRequestException