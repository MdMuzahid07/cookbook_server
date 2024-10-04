import { Schema } from "mongoose";


const membershipSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    membershipType: {
        type: String,
        default: "free",
    },
    paymentId: {
        type: String,
    },
    paymentMethod: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        required: true,
    },
    activeStatus: {
        type: Boolean,
        default: false,
    },
});


export default membershipSchema;