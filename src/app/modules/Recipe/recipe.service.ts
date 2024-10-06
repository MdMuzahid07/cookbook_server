/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import RecipeModel from "./recipe.model";
import UserModel from "../user/user.model";

const createRecipeIntoDB = async (file: any, payload: any) => {

    const authorId = payload?.author;
    const isAuthorExists = await UserModel.findById(authorId);

    if (!isAuthorExists) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "this recipes author doesn't exists");
    };

    if (!file) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "image must be added");
    }

    if (!payload) {
        throw new CustomAppError(httpStatus.NOT_FOUND, "data must be added");
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

const updateRecipeFromDB = async (payload: any, id: string) => {

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

    const res = await RecipeModel.find().populate("author");
    return res;
};


export const RecipeService = {
    createRecipeIntoDB,
    updateRecipeFromDB,
    deleteRecipeFromDB,
    getAllRecipeFromDB
};