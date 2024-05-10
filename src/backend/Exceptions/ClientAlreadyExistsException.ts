
export default class ClientAlreadyExistsException extends Error {
    constructor(message: string = "Client already exists") {
        super(message);
        this.name = "ClientAlreadyExistsException";
    }
}