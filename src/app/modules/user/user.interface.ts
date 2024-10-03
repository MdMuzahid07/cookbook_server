import { Types } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
    bio: string;
    role: "admin" | "user";
    avatar: string;
    isDeleted: boolean;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    __v?: null;
    createdAt?: string;
    updatedAt?: string;
};