import { USER_ROLES } from "./auth.const";

export type TUserRole = keyof typeof USER_ROLES;

export type TLogin = {
    email: string;
    password: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: null;
};
