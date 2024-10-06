/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import RecipeModel from "./recipe.model";

const createRecipeIntoDB = async (payload: any) => {

    const res = await RecipeModel.create(payload);

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

    const res = await RecipeModel.find();
    return res;
};


export const RecipeService = {
    createRecipeIntoDB,
    updateRecipeFromDB,
    deleteRecipeFromDB,
    getAllRecipeFromDB
};