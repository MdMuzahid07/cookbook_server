import httpStatus from "http-status";
import UserModel from "../user/user.model";
import { TLogin } from "./auth.interface";
import CustomAppError from "../../errors/CustomAppError";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";


const LoginUser = async (payload: TLogin) => {
    const { email, password } = payload;

    const isUserExistsOnDB = await UserModel.findOne({
        email,
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExistsOnDB?.password,
    );

    if (!isPasswordMatched) {
        throw new CustomAppError(
            httpStatus.BAD_REQUEST,
            "user password not matched, please try again with right password",
        );
    }

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    // jwt token

    const jwtPayload = {
        id: isUserExistsOnDB._id,
        email: isUserExistsOnDB?.email,
        password: isUserExistsOnDB?.password,
        role: isUserExistsOnDB?.role,
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

    const result = isUserExistsOnDB.toObject() as Partial<TLogin>;

    // removing some property property from response after saving in DB
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

const refreshTokenService = async (token: string) => {
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_token_secret_key as string,
    ) as JwtPayload;

    const { email } = decoded;

    const isUserExistsOnDB = await UserModel.findOne({
        email,
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    const jwtPayload = {
        email: isUserExistsOnDB?.email,
        password: isUserExistsOnDB?.password,
        role: isUserExistsOnDB?.role,
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_token_secret_key as string,
        { expiresIn: config.jwt_access_token_expires_in },
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    LoginUser,
    refreshTokenService,
};