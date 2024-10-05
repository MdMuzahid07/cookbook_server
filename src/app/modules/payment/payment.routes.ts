import express from "express";
import { paymentController } from "./payment.controller";


const router = express.Router();

router.post("/confirmation", paymentController.confirmationController);
router.post("/cancel", paymentController.cancelController);

export const paymentRoutes = router;