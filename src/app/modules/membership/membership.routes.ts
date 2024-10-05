import express from "express";
import { MembershipController } from "./membership.controller";
import requestValidator from "../../middlewares/requestValidator";
import { MembershipValidation } from "./membership.validation";


const router = express.Router();


// creation an session for checkout
router.post(
    "/create-subscription",
    requestValidator(MembershipValidation.membershipValidationSchema),
    MembershipController.createMembership
);


export const membershipRoutes = router;