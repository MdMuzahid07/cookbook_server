import express from "express";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
    "/register",
    requestValidator(UserValidation.UserValidationSchema),
    UserController.createUser
);


router.patch(
    "/update/:id",
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.updateUserInfoController
);


export const UserRoutes = router;