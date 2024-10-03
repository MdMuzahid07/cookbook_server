export type TUser = {
    name: string;
    email: string;
    password: string;
    bio: string;
    role: "admin" | "user";
    avatar: string;
    isDeleted: boolean;
    __v?: null;
    createdAt?: string;
    updatedAt?: string;
};