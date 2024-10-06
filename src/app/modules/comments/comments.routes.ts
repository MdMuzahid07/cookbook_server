import express from "express";
import authorizationGuard from "../../middlewares/authorizationGuard";
import { USER_ROLES } from "../auth/auth.const";
import requestValidator from "../../middlewares/requestValidator";
import { RecipeValidation } from "../Recipe/recipe.validation";
import { CommentController } from "./comments.controller";


const router = express.Router();



router.post("/create-comment/:id",
    authorizationGuard(USER_ROLES.user),
    requestValidator(RecipeValidation.commentValidationSchema),
    CommentController.createComment
);


export const CommentRouter = router;