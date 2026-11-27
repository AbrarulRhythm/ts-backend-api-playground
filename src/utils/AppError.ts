export interface FieldError {
    field: string;
    message: string;
}

class AppError extends Error {
    public statusCode: number;
    public errors: FieldError[] | undefined;

    constructor(statusCode: number, message: string, errors?: FieldError[], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
