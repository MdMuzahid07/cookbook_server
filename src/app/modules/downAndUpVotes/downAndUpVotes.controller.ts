import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";
import { VoteService } from "./downAndUpVotes.service";

const createUpDownVote = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization;
        const payload = req.body;
        const recipeId = req.params.recipeId;

        const result = await VoteService.createDownUpVoteIntoDB(token, payload, recipeId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "you vote the recipe successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



export const VoteController = {
    createUpDownVote
};