import { Schema } from "mongoose";
import { TComment } from "../Recipe/recipe.interface";

const CommentSchema = new Schema<TComment>(
    {
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);

export default CommentSchema;