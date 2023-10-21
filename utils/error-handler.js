
class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static serverError = (message = 'Internal Server Error') => new ErrorHandler(message, 500);

    static badRequest = (message = 'Bad Request') => new ErrorHandler(message, 422);

    static notFound = (message = 'Resource Not Found') => new ErrorHandler(message, 404);

    static notAllowed = (message = 'Not Allowed') => new ErrorHandler(message, 403);

    static unAuthorized = (message = 'Unauthorized Access') => new ErrorHandler(message, 401);

    static responseSuccess = (message = 'Done') => new ErrorHandler(message, 200);

}

module.exports = ErrorHandler;