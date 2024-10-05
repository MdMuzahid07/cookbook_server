import { Schema } from "mongoose";
import { TMembership } from "./membership.interface";


const membershipSchema = new Schema<TMembership>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: null
    },
    subscription: {
        type: String,
        enum: ["1 Month", "3 Months", "6 Months", "1 Year"],
    },
    // status will be active after successful payment
    status: {
        type: String,
        enum: ["Active", "InActive"],
        default: "InActive",
    },
    transactionId: {
        type: String,
        default: null,
    }
});


export default membershipSchema;