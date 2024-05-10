

export default class DataNotFormattedWellException extends Error {
    constructor(message: string = "Data not formatted well") {
        super(message);
        this.name = "DataNotFormattedWellException";
    }
}