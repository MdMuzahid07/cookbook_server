import { z } from "zod";

const voteValidationSchema = z.object({
    userId: z.string().optional(),
    voteType: z.enum(["upVote", "downVote"], {
        required_error: "Vote type is required",
    }),
    recipeId: z.string().optional()
});


export const VoteValidation = {
    voteValidationSchema
};

