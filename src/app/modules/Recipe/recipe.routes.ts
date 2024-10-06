import express from "express";
import requestValidator from "../../middlewares/requestValidator";
import { RecipeValidation } from "./recipe.validation";
import { RecipeController } from "./recipe.controller";

const router = express.Router();

router.post(
    "/create-recipe",
    requestValidator(RecipeValidation.recipeValidationSchema),
    RecipeController.createRecipe,
);

router.get(
    "/",
    RecipeController.getAllRecipe,
);

router.delete(
    "/:id",
    RecipeController.deleteARecipe,
);

router.patch(
    "/:id",
    requestValidator(RecipeValidation.recipeUpdateValidationSchema),
    RecipeController.updateARecipe,
);


export const RecipeRouter = router;