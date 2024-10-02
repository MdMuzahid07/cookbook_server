/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/zodError";
import { ZodError } from "zod";

function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "",
    },
  ];

  if (error instanceof ZodError) {
    const customErrorPattern = handleZodError(error);

    statusCode = customErrorPattern?.statusCode;
    message = customErrorPattern?.message;
    errorSources = customErrorPattern?.errorSources;
  }

  // custom pattern of errors

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    checkErrorPattern: error,
    stack: config.NODE_ENV === "development" ? error.stack : null,
  });
}

export default globalErrorHandler;
