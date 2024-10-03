import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import config from "../../config";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken, user } = await UserService.createUserIntoDB(req.body);

        // for saving refresh token in browser cookie
        res.cookie("refreshToken", refreshToken, {
            secure: config.NODE_ENV === "production",
            httpOnly: true,
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "user registered successfully",
            token: accessToken,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


const updateUserInfoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const result = await UserService.updateAUserInfoFromDB(id, payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "user info updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const followAUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const targetUserId = req.params.id;

        const result = await UserService.followAUser(token, targetUserId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "user followed",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



export const UserController = {
    createUser,
    updateUserInfoController,
    followAUserController
};