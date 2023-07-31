class InternalServerException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'INTERNAL-SERVER-ERROR-EXCEPTION'
    }
}

export default InternalServerException