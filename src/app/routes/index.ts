import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { LoginRoute } from "../modules/auth/auth.routes";
import { membershipRoutes } from "../modules/membership/membership.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: LoginRoute
    },
    {
        path: "/subscription",
        route: membershipRoutes
    },
    {
        path: "/payment",
        route: paymentRoutes
    },
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;