/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import CommentModel from "./comment.model";
import RecipeModel from "../Recipe/recipe.model";
import UserModel from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";


const createACommentIntoDB = async (token: any, payload: any, recipeId: string) => {

    if (!token) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you are unauthorized");
    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_token_secret_key as string,
    ) as JwtPayload;

    const { id } = decoded;

    const isAuthorExists = await UserModel.findById(id);

    if (!isAuthorExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "user doesn't exists");
    };

    if (!payload) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "data must be added");
    }

    const isRecipeExists = await RecipeModel.findById(recipeId);

    if (!isRecipeExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "recipe not found");
    }

    const commentData = {
        ...payload,
        userId: id,
        recipeId: recipeId
    };

    const response = await CommentModel.create(commentData);
    const commentId = response?._id;

    let res;
    if (commentId) {
        isRecipeExists.comments.push(commentId);
        res = await isRecipeExists.save();
    }

    return res;
};



export const CommentService = {
    createACommentIntoDB,
};