export default class HttpError {
    constructor(data, code) {
        this.data = data;
        this.code = code;
        this.httpError = true;
    }
}
