import { Types } from "mongoose"


export type TVote = {
    userId: Types.ObjectId;
    voteType: "upVote" | "downVote";
    recipeId: Types.ObjectId;
}