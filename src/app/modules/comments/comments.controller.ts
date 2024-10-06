import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";
import { CommentService } from "./comments.service";
import { NextFunction, Request, Response } from "express";


const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeId = req.params.id;
        const token = req.headers.authorization;
        const payload = req.body;

        const result = await CommentService.createACommentIntoDB(token, payload, recipeId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "commented successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



export const CommentController = {
    createComment
};