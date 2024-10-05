/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import UserModel from "./user.model";

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
        email: payload?.email,
        role: payload?.role,
        name: payload?.name,
        avatar: payload?.avatar
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



const updateAUserInfoFromDB = async (id: string, payload: any) => {

    if (!id) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "id is required to update profile info");
    }

    if (!payload) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "data is required to update the profile");
    }

    const isUserExists = await UserModel.findById({ _id: id });

    if (!isUserExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "this user not exists to update");
    }

    const profileInfoUpdateResponse = await UserModel.findByIdAndUpdate(
        id,
        // we use $set operator to update specific field
        { $set: payload },
        {
            new: true,
            runValidators: true
        }
    );

    const result = profileInfoUpdateResponse?.toObject() as Partial<TUser>;

    // removing some property from response after save into DB
    if (result) {
        delete result.__v;
        delete result.createdAt;
        delete result.updatedAt;
    };

    return result;
};



const followAUser = async (token: any, targetUserId: any) => {

    if (!token) {
        throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized to follow the user");
    };

    const decoded = jwt.verify(token, config.jwt_access_token_secret_key as string);

    const userId = decoded?.id;

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

    const userId = decoded?.id;

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


export const UserService = {
    createUserIntoDB,
    updateAUserInfoFromDB,
    followAUser,
    unFollowAUser
};