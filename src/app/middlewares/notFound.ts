import { Request, Response } from "express";
import httpStatus from "http-status";

const NotFound = (req: Request, res: Response) => {
  res.sendStatus(httpStatus.NOT_FOUND).json({
    status: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  });
};

export default NotFound;
