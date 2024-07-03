class ApiResponse {

    constructor(code , data, message){
        this.code = code;
        this.data = data;
        this.message = message
    }
    
}


module.exports = {
    ApiResponse
}