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

export const UserService = {
    createUserIntoDB,
};