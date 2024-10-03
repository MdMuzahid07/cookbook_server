/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    const isUserExists = await UserModel.findOne({ email: payload?.email });

    // checking user exist or not
    if (isUserExists) {
        throw new CustomAppError(
            httpStatus.BAD_REQUEST,
            "this user is already exits",
        );
    }


    // jwt 
    const jwtPayload = {
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

    const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_round));
    const hash = bcrypt.hashSync(payload?.password, salt);

    const user = <TUser>{
        ...payload,
        password: hash,
    };

    const responseAfterSave = await UserModel.create(user);

    const result = responseAfterSave.toObject() as Partial<TUser>;

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



export const UserService = {
    createUserIntoDB,
    updateAUserInfoFromDB
};