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

router.post(
    "/reset-password",
    requestValidator(AuthValidation.passwordResetValidationSchema),
    AuthController.passwordResetController,
);

router.post(
    "/reset-password/:token",
    requestValidator(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetThePasswordController,
);

router.post(
    "/change-password",
    requestValidator(AuthValidation.changeCurrentPasswordValidationSchema),
    AuthController.changeCurrentPasswordController,
);


export const LoginRoute = router;