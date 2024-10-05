import express, { NextFunction, Request, Response } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
    "/register",
    multerUpload.single("avatar"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidator(UserValidation.UserValidationSchema),
    UserController.createUser
);


router.patch(
    "/update/:id",
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.updateUserInfoController
);


router.post(
    "/follow/:id",
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.followAUserController
);

router.post(
    "/un-follow/:id",
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.unFollowAUserController
);


export const UserRoutes = router;