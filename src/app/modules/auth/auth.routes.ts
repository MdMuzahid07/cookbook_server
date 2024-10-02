import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import requestValidator from "../../middlewares/requestValidator";

const router = express.Router();

router.post(
    "/login",
    requestValidator(AuthValidation.LoginDataValidation),
    AuthController.LoginUser,
);

router.post(
    "/refresh-token",
    requestValidator(AuthValidation.refreshTokenValidationSchema),
    AuthController.refreshTokenController,
);

export const LoginRoute = router;