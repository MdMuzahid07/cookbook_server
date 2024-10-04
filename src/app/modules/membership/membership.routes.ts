import express from "express";
import { MembershipController } from "./membership.controller";


const router = express.Router();


// creation an session for checkout
router.post(
    "/create-checkout",
    MembershipController.checkOutSessionController
);