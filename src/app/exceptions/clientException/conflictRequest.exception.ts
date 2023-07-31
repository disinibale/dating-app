class ConflictRequestException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'CONFLICT-REQUEST-EXCEPTION'
    }
}

export default ConflictRequestException