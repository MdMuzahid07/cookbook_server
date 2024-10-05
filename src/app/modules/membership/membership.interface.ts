import { Types } from "mongoose";

export type TMembership = {
    userId: Types.ObjectId;
    paymentMethod?: string;
    startDate: Date;
    endDate?: Date | null;
    subscription?: string;
    status: string;
    transactionId?: string;
};