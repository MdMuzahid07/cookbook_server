import { NextFunction, Request, Response } from "express";
import { RecipeService } from "./recipe.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";


const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        const result = await RecipeService.createRecipeIntoDB(payload);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "recipe created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const updateARecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const id = req.params.id;

        const result = await RecipeService.updateRecipeFromDB(payload, id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "recipe updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteARecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const result = await RecipeService.deleteRecipeFromDB(id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "recipe deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RecipeService.getAllRecipeFromDB();

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "recipe retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


export const RecipeController = {
    createRecipe,
    updateARecipe,
    deleteARecipe,
    getAllRecipe
};