import { z } from "zod";

const LoginDataValidation = z.object({
    email: z.string(),
    password: z.string(),
});

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: "refresh token is required" })
    }).optional()
});


export const AuthValidation = {
    LoginDataValidation,
    refreshTokenValidationSchema,
};