class ApiError extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        errors =[],
        stack=""
    ){
        super(message)
        this.statusCode= statusCode
        this.data= null
        this.errors = errors
        this.message= message
        this.success = false
        this.stack = stack
    }
}
export {ApiError}