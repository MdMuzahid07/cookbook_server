/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import config from "../../config";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { accessToken, refreshToken, user } = await UserService.createUserIntoDB(req.file, req.body);

        res.cookie("refreshToken", refreshToken, {
            secure: config.NODE_ENV === "production",
            httpOnly: true,
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "user registered successfully",
            data: { accessToken, refreshToken, user },
        });
    } catch (error) {
        next(error);
    }
};


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await UserService.getAllUsers();


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "users retrieved successfully",
            data: data,
        });
    } catch (error) {
        next(error);
    }
};


const getASingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const data = await UserService.getASingleUserFromDB(id);


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "user retrieved successfully",
            data: data,
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

const unFollowAUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const targetUserId = req.params.id;

        const result = await UserService.unFollowAUser(token, targetUserId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "user un followed",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const blockUnBlockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const targetUserId = req.params.id;

        const result = await UserService.blockUnBlockUserFromDB(token, targetUserId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: `user, ${result?.name} ${result?.isBlocked ? "blocked" : "unblocked"}`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const publishUnPublishRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const targetRecipeId = req.params.id;

        const result = await UserService.publishUnPublishRecipeFromDB(token, targetRecipeId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: `recipe, ${result?.title} ${(result as any)?.isBlocked ? "unpublished" : "published"}`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const promoteDemoteUserAdminByAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const targetUserId = req.params.id;

        const result = await UserService.promoteDemoteUserAdminByAdminFromDB(token, targetUserId);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: ` ${result?.name} ${result?.role === "user" ? "demoted as user" : " promoted as admin"}`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};




export const UserController = {
    createUser,
    updateUserInfoController,
    followAUserController,
    unFollowAUserController,
    blockUnBlockUser,
    publishUnPublishRecipe,
    promoteDemoteUserAdminByAdmin,
    getUsers,
    getASingleUser
};