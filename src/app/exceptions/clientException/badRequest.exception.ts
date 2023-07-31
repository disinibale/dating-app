class BadRequestException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'BAD-REQUEST-EXCEPTION'
    }
}

export default BadRequestException