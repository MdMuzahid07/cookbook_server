/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import RecipeModel from "./recipe.model";
import UserModel from "../user/user.model";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const createRecipeIntoDB = async (file: any, payload: any) => {

    const authorId = payload?.author;
    const isAuthorExists = await UserModel.findById(authorId);
    if (!isAuthorExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "this recipes author doesn't exists");
    };
    if (!payload) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "data must be added");
    }

    const isThisRecipeExists = await RecipeModel.findOne({ author: payload?.author, title: payload?.title, description: payload?.description });


    if (isThisRecipeExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "this recipe already exists");
    };

    if (!file) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "image must be added");
    }

    const recipeData = {
        ...payload,
    };

    if (file) {
        recipeData.images = file?.path;
    };

    const res = await RecipeModel.create(recipeData);

    return res;
};

const updateRecipeFromDB = async (id: string, payload: any) => {

    const isThisRecipeExists = await RecipeModel.findById(id);

    if (!isThisRecipeExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "this recipe does't exists");
    };


    const res = await RecipeModel.findByIdAndUpdate(
        id,
        {
            $set: payload
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res;

};

const deleteRecipeFromDB = async (id: string) => {

    const isThisRecipeExists = await RecipeModel.findById(id);

    if (!isThisRecipeExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "this recipe does't exists");
    };

    const res = await RecipeModel.findByIdAndDelete(id);

    return res;

};


const getAllRecipeFromDB = async () => {

    const res = await RecipeModel.find()
        .sort({ createdAt: -1 })
        .populate("author").populate({
            path: "ratings.author",
            model: "User",
            select: "name email avatar bio"
        }).populate("comments");

    return res;
};


const giveARating = async (token: any, payload: any, recipeId: string) => {

    if (!token) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "you are not unauthorized");
    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_token_secret_key as string,
    ) as JwtPayload;

    const { email, id } = decoded;

    const isUserExistsOnDB = await UserModel.findOne({
        email,
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    const isRecipeExists = await RecipeModel.findById(recipeId);

    if (!isRecipeExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "user not exists");
    }

    const isAlreadyRated = isRecipeExists?.ratings.find(rating => rating?.author?.toString() === id);

    if (isAlreadyRated) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "already rated this recipe");
    }

    const ratingData = {
        ...payload,
        author: id
    };

    isRecipeExists.ratings.push(ratingData);

    const res = await isRecipeExists.save();

    return res;
};

const getASingleRecipe = async (id: string) => {
    const res = await RecipeModel.findById(id)
        .populate("author")
        .populate({
            path: "ratings.author",
            model: "User",
            select: "name email avatar bio"
        })
        .populate({
            path: "comments",
            populate: {
                path: "userId",
                model: "User",
                select: "name email avatar"
            }
        });

    return res;
};



export const RecipeService = {
    createRecipeIntoDB,
    updateRecipeFromDB,
    deleteRecipeFromDB,
    getAllRecipeFromDB,
    giveARating,
    getASingleRecipe
};