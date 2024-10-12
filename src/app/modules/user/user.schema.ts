import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            minlength: 6,
        },
        bio: {
            type: String,
            maxLength: 500,
            default: "I'm an great person, with good personality"
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        avatar: {
            type: String,
            default: '',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        membership: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership",
            default: null
        }
    },
    {
        timestamps: true,
    }
);


export default UserSchema;