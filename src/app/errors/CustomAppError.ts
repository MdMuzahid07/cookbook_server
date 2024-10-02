// create an custom class to throw error with status code to extends Error(builtInClass)
class CustomAppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack?: " ") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default CustomAppError;
