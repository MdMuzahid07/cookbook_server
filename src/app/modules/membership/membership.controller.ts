import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import { MembershipService } from "./membership.service";


const checkOutSessionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { priceId, userId } = req.body;

        const sessionId = await MembershipService.checkOutSessionService(priceId, userId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "session created successfully",
            data: sessionId,
        });
    } catch (error) {
        next(error);
    }
};



export const MembershipController = {
    checkOutSessionController
};