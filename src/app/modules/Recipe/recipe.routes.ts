import express, { NextFunction, Request, Response } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { RecipeValidation } from "./recipe.validation";
import { RecipeController } from "./recipe.controller";
import { multerUpload } from "../../config/multer.config";
import authorizationGuard from "../../middlewares/authorizationGuard";
import { USER_ROLES } from "../auth/auth.const";

const router = express.Router();

router.post(
    "/create-recipe",
    authorizationGuard(USER_ROLES.user),
    multerUpload.single("image"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidator(RecipeValidation.recipeValidationSchema),
    RecipeController.createRecipe,
);

router.get(
    "/",
    authorizationGuard(USER_ROLES.user, USER_ROLES.admin),
    RecipeController.getAllRecipe,
);

router.delete(
    "/:id",
    authorizationGuard(USER_ROLES.user),
    RecipeController.deleteARecipe,
);

router.patch(
    "/:id",
    authorizationGuard(USER_ROLES.user),
    requestValidator(RecipeValidation.recipeUpdateValidationSchema),
    RecipeController.updateARecipe,
);

router.patch(
    "/rating/:id",
    authorizationGuard(USER_ROLES.user),
    RecipeController.addRating,
);


export const RecipeRouter = router;