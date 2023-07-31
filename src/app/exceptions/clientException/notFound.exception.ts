class NotFoundException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'DATA-NOT-FOUND-EXCEPTION'
    }
}

export default NotFoundException