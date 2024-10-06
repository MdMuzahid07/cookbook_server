import express from "express";
import authorizationGuard from "../../middlewares/authorizationGuard";
import { USER_ROLES } from "../auth/auth.const";
import requestValidator from "../../middlewares/requestValidator";
import { VoteController } from "./downAndUpVotes.controller";
import { VoteValidation } from "./downAndUpVotes.validation";


const router = express.Router();


router.post(
    "/add-vote/:recipeId",
    authorizationGuard(USER_ROLES.user, USER_ROLES.admin),
    requestValidator(VoteValidation.voteValidationSchema),
    VoteController.createUpDownVote
);


export const VoteRouter = router;