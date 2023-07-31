class EmailAlreadyRegisteredException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'EMAIL-ALREADY-REGISTERED-EXCEPTION'
    }
}

export default EmailAlreadyRegisteredException