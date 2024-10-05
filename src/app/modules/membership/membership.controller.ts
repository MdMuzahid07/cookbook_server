import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import { MembershipService } from "./membership.service";


const createMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        const result = await MembershipService.createMembershipIntoDB(payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "membership created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



export const MembershipController = {
    createMembership
};