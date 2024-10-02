import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const requestValidator = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // if the validation is OK, then next function will called
            await schema.parseAsync(req.body, req.cookies);
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default requestValidator;