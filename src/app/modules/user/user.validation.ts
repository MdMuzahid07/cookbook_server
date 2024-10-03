import { z } from "zod";

const UserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, { message: "password should be minimum 6 characters" }).max(20, { message: "password can't be more than 20 characters" }),
    role: z.string(),
    avatar: z.string(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
});

const UpdateUserValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().min(6, { message: "password should be minimum 6 characters" }).max(20, { message: "password can't be more than 20 characters" }).optional(),
    role: z.string().optional(),
    avatar: z.string().optional(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
});



export const UserValidation = {
    UserValidationSchema,
    UpdateUserValidationSchema
};