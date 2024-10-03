import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        bio: {
            type: String,
            required: true,
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
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
    },
    {
        timestamps: true,
    }
);


export default UserSchema;