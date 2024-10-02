import { z } from "zod";

const UserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, { message: "password should be minimum 6 characters" }).max(20, { message: "password can't be more than 20 characters" }),
    role: z.string(),
    avatar: z.string()
});


export const UserValidation = {
    UserValidationSchema
};