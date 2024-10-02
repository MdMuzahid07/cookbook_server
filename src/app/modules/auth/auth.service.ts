/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import UserModel from "../user/user.model";
import { TLogin } from "./auth.interface";
import CustomAppError from "../../errors/CustomAppError";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { transporter } from "../../utils/mailTransporter";

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


const passwordReset = async (payload: any) => {
    const user = await UserModel.findOne({ email: payload });

    console.log(user);

    if (!user) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    // create a reset token 
    const resetToken = jwt.sign(
        { userId: user._id },
        config.jwt_reset_password_secret_key as string,
        { expiresIn: '30m' }
    );

    // send mail 

    const resetLink = `${config.frontend_url}/change-password/${resetToken}`;

    const res = await transporter.sendMail({
        from: "mdmuzahid7396@gmail.com",
        to: user.email,
        subject: 'Password Reset',
        html: `
        <div>
        <h1 style="text-align:center;margin-bottom:1rem">Reset your password</h1>
        <p style="text-align:center">this link will be invalid in 30 minutes</p>
         <a style="color:blue; text-align:center" href="${resetLink}">Reset Password</a>
        </div>
        `,
    });

    return { res: `mail send to ${res.accepted}` };
};


export const AuthServices = {
    LoginUser,
    refreshTokenService,
    passwordReset
};