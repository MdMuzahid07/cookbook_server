import { Types } from "mongoose";

export type TMembership = {
    userId: Types.ObjectId;
    membershipType: "free" | "premium";
    paymentId?: string;
    paymentMethod?: "aamarpay";
    startDate: Date;
    endDate: Date;
    activeStatus: boolean;
};