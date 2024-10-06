import { Schema } from "mongoose";
import { TVote } from "./downAndUpVotes.interface";


const VoteSchema = new Schema<TVote>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        voteType: {
            type: String,
            enum: ["upVote", "downVote"],
            required: true,
        },
        recipeId: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default VoteSchema;
