class ApiError extends Error {
    constructor(code, message ="server error"){
        super(message);
        this.code = code;
    }
}


module.exports = {
    ApiError
}