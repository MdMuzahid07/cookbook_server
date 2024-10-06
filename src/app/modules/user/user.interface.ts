import { Types } from "mongoose";

export type TUser = {
    name: string;
    _id?: string;
    email: string;
    password: string;
    bio: string;
    role: "admin" | "user";
    avatar: string;
    isDeleted: boolean;
    isBlocked: boolean;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    membership?: Types.ObjectId;
    __v?: null;
    createdAt?: string;
    updatedAt?: string;
};