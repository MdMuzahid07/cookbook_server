/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import UserModel from "../user/user.model";
import RecipeModel from "../Recipe/recipe.model";
import VoteModel from "./downAndUpVotes.model";


const createDownUpVoteIntoDB = async (token: any, payload: string, recipeId: string) => {

    if (!token) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you are not unauthorized");
    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_token_secret_key as string,
    ) as JwtPayload;

    const userId = decoded?.id;
    const isUserExistsOnDB = await UserModel.findById(userId);

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    const isRecipeExists = await RecipeModel.findById(recipeId).populate("upVotes").populate("downVotes");

    if (!isRecipeExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "recipe not exists");
    }

    if ((payload as any)?.voteType === "upVote") {
        // prevent duplicate upVote 
        const isAlreadyUpVoted = isRecipeExists?.upVotes.find((vote: any) => vote?.userId?.toString() === userId);
        if (isAlreadyUpVoted) {
            throw new CustomAppError(httpStatus.BAD_REQUEST, "this recipe has  already received your upvote.");
        }
    } else if ((payload as any)?.voteType === "downVote") {
        // prevent duplicate downVote 
        const isAlreadyDownVoted = isRecipeExists?.downVotes.find((vote: any) => vote?.userId?.toString() === userId);
        if (isAlreadyDownVoted) {
            throw new CustomAppError(httpStatus.BAD_REQUEST, "this recipe has already received your downvote.");
        }
    }


    const voteData = {
        voteType: (payload as any).voteType,
        userId: userId,
        recipeId: recipeId
    };


    const response = await VoteModel.create(voteData);
    const voteId = response?._id;

    if (response?.voteType === "upVote") {
        isRecipeExists.upVotes.push(voteId);
    } else if (response?.voteType === "downVote") {
        isRecipeExists.downVotes.push(voteId);
    }

    const res = await isRecipeExists.save();

    // console.log({ responseAfterVoteIdSaveInRecipe: res })

    return res;
};


export const VoteService = {
    createDownUpVoteIntoDB
};