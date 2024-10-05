import httpStatus from "http-status";
import { TMembership } from "./membership.interface";
import CustomAppError from "../../errors/CustomAppError";
import MembershipModel from "./membership.model";
import UserModel from "../user/user.model";
import paymentInitialization from "../payment/payment.utils";


const createMembershipIntoDB = async (payload: TMembership) => {
    const userId = payload?.userId;
    const isExists = await MembershipModel.findOne({ userId });

    if (isExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "already an premium member");
    }

    const transactionId = `TNX-ID${Date.now()}-${userId}`;

    const membershipPayload = {
        ...payload,
        transactionId: transactionId
    };


    const res = await MembershipModel.create(membershipPayload);
    const user = await UserModel.findById(userId);


    // payment system 
    //

    const payableAmount = 20 * Number(payload?.subscription?.split(" ")[0]);



    const paymentInfo = {
        transactionId,
        email: user?.email,
        name: user?.name,
        payableAmount,
    };


    const paymentResponse = await paymentInitialization(paymentInfo);

    console.log(paymentResponse);


    return res;
};



export const MembershipService = {
    createMembershipIntoDB
};