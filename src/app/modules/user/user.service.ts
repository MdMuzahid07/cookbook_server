/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import UserModel from "./user.model";
import RecipeModel from "../Recipe/recipe.model";

const createUserIntoDB = async (file: any, payload: TUser) => {
    const isUserExists = await UserModel.findOne({ email: payload?.email });

    // checking user exist or not
    if (isUserExists) {
        throw new CustomAppError(
            httpStatus.BAD_REQUEST,
            "this user is already exits",
        );
    }

    const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_round));
    const hash = bcrypt.hashSync(payload?.password, salt);

    const userData = <TUser>{
        ...payload,
        password: hash
    };

    if (file) {
        userData.avatar = file?.path;
    };

    const responseAfterSave = await UserModel.create(userData);

    const result = responseAfterSave.toObject() as Partial<TUser>;

    const registeredUserId = result?._id?.toString();

    // jwt 
    const jwtPayload = {
        id: registeredUserId,
        email: userData?.email,
        role: result?.role,
        name: payload?.name,
        avatar: result?.avatar
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_token_secret_key as string,
        { expiresIn: config.jwt_access_token_expires_in },
    );
    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_token_secret_key as string,
        { expiresIn: config.jwt_refresh_token_expires_in },
    );


    // removing some property after saving to DB for clean response to client
    if (result) {
        delete result.isDeleted;
        delete result.password;
        delete result.__v;
        delete result.createdAt;
        delete result.updatedAt;
    };

    return {
        accessToken,
        refreshToken,
        user: result,
    };
};


const updateAUserInfoFromDB = async (file: any, id: string, payload: Partial<TUser>) => {
    if (!id) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User ID is required to update profile info");
    }

    const isUserExists = await UserModel.findById(id).lean();

    if (!isUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const updatedData = { ...payload };

    if (file && file.path) {
        updatedData.avatar = file.path;
    }

    const profileInfoUpdateResponse = await UserModel.findByIdAndUpdate(
        id,
        { $set: updatedData },
        {
            new: true,
            runValidators: true,
            //  returns a plain JS object
            lean: true
        }
    );

    if (!profileInfoUpdateResponse) {
        throw new CustomAppError(httpStatus.INTERNAL_SERVER_ERROR, "failed to update user profile");
    }

    const result = profileInfoUpdateResponse as Partial<TUser>;

    // Remove unwanted fields
    delete result.__v;
    delete result.createdAt;
    delete result.updatedAt;

    return result;
};













const followAUser = async (token: any, targetUserId: any) => {

    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to follow the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = (decoded as any)?.id;

    const currentUser = await UserModel.findById(userId);
    const targetUser = await UserModel.findById(targetUserId);

    if (!currentUser?.following.includes(targetUserId)) {
        // Adding to the following list
        currentUser?.following.push(targetUserId);
        const resFollowingList = await currentUser?.save();

        // Add current user to the target users  followers list to 
        targetUser?.followers.push(userId);
        const resFollowerList = await targetUser?.save();

        return {
            resFollowingList,
            resFollowerList
        };
    }

    // checking this user already followed 
    if (currentUser?.following.includes(targetUserId)) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you already followed this user");
    }

};


const unFollowAUser = async (token: any, targetUserId: any) => {

    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to un follow the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = (decoded as any)?.id;

    const isCurrentUserExists = await UserModel.findById(userId);
    const isTargetUserExists = await UserModel.findById(targetUserId);

    if (!isCurrentUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "current user not exists");
    };

    if (!isTargetUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "target user not exists");
    };


    if (userId === targetUserId) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you are not able to un follow yourself");
    };

    // updating both user by removing follower and following

    // who is following
    const currentUser = await UserModel.findByIdAndUpdate(
        userId,
        {
            $pull: { following: targetUserId }
        },
        {
            new: true
        }
    );


    // who is followed

    const targetUser = await UserModel.findByIdAndUpdate(
        targetUserId,
        {
            $pull: { followers: userId }
        },
        {
            new: true
        }
    );

    /* it ensure all the promise resolved by waiting, if any of this promise reject it will reject all promises */
    await Promise.all([currentUser, targetUser]);

    return {
        currentUser,
        targetUser
    };
};


const blockUnBlockUserFromDB = async (token: any, targetUserId: string) => {
    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to block or unblocked the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = (decoded as any)?.id;

    const isCurrentUserExists = await UserModel.findById(userId);
    const isTargetUserExists = await UserModel.findById(targetUserId);

    if (!isCurrentUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "current user not exists");
    };

    if (!isTargetUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "target user not exists");
    };

    if (userId === targetUserId) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you are not able to block yourself");
    };


    const res = await UserModel.findByIdAndUpdate(
        targetUserId,
        { $set: { isBlocked: !isTargetUserExists.isBlocked } },
        {
            new: true,
            runValidators: true
        }
    );

    return res;
};




const publishUnPublishRecipeFromDB = async (token: any, recipeId: string) => {
    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to publish or unpublish the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = (decoded as any)?.id;

    const isCurrentUserExists = await UserModel.findById(userId);
    const isRecipeExists = await RecipeModel.findById(recipeId);

    if (!isCurrentUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "current user not exists");
    };

    if (!isRecipeExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "target recipe not exists");
    };


    const res = await RecipeModel.findByIdAndUpdate(
        recipeId,
        { $set: { isPublished: !isRecipeExists.isPublished } },
        {
            new: true,
            runValidators: true
        }
    );

    return res;
};


const promoteDemoteUserAdminByAdminFromDB = async (token: any, targetUserId: string) => {
    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to promote or demote the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = (decoded as any)?.id;

    const isCurrentUserExists = await UserModel.findById(userId);
    const isTargetUserExists = await UserModel.findById(targetUserId);

    if (!isCurrentUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "current user not exists");
    };

    if (!isTargetUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "target user not exists to promote to demote");
    };


    const res = await UserModel.findByIdAndUpdate(
        targetUserId,
        { $set: { role: isTargetUserExists?.role === "user" ? "admin" : "user" } },
        {
            new: true,
            runValidators: true
        }
    );

    return res;
};


const getAllUsers = async () => {
    const res = await UserModel.find();
    return res;
};


const getASingleUserFromDB = async (id: string) => {
    const res = await UserModel.findById(id).populate("membership");
    return res;
};


export const UserService = {
    createUserIntoDB,
    updateAUserInfoFromDB,
    followAUser,
    unFollowAUser,
    blockUnBlockUserFromDB,
    publishUnPublishRecipeFromDB,
    promoteDemoteUserAdminByAdminFromDB,
    getAllUsers,
    getASingleUserFromDB
};