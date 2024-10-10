import express, { NextFunction, Request, Response } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import authorizationGuard from "../../middlewares/authorizationGuard";
import { USER_ROLES } from "../auth/auth.const";

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
    authorizationGuard(USER_ROLES.user, USER_ROLES.admin),
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.updateUserInfoController
);

router.post(
    "/follow/:id",
    authorizationGuard(USER_ROLES.user, USER_ROLES.admin),
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.followAUserController
);

router.post(
    "/un-follow/:id",
    authorizationGuard(USER_ROLES.user, USER_ROLES.admin),
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.unFollowAUserController
);

router.patch(
    "/block-unblock/:id",
    authorizationGuard(USER_ROLES.admin),
    requestValidator(UserValidation.UpdateUserValidationSchema),
    UserController.blockUnBlockUser
);


router.patch(
    "/publish-unpublish-recipe/:id",
    authorizationGuard(USER_ROLES.admin),
    UserController.publishUnPublishRecipe
);


router.patch(
    "/promote-demote-user/:id",
    authorizationGuard(USER_ROLES.admin),
    UserController.promoteDemoteUserAdminByAdmin
);


router.get(
    "/",
    authorizationGuard(USER_ROLES.admin),
    UserController.getUsers
);

router.get(
    "/:id",
    authorizationGuard(USER_ROLES.admin, USER_ROLES.user),
    UserController.getASingleUser
);


export const UserRoutes = router;