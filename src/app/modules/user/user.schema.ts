import { Schema } from "mongoose";

const UserSchema = new Schema(
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
        }
    },
    {
        timestamps: true,
    }
);


export default UserSchema;