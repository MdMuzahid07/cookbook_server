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

    const transactionId = `TNX-ID${Date.now()}-${userId}}`;

    const membershipPayload = {
        ...payload,
        transactionId: transactionId
    };


    const res = await MembershipModel.create(membershipPayload);
    const user = await UserModel.findById(userId);
    const membershipId = res?._id;



    // payment system will implement here
    //

    let payableAmount;
    const pricePerMonth = 20;

    if (payload?.subscription === "1 Month") {
        payableAmount = Number(pricePerMonth) * 1;
    } else if (payload?.subscription === "3 Month") {
        payableAmount = Number(pricePerMonth) * 3;
    } else if (payload?.subscription === "6 Month") {
        payableAmount = Number(pricePerMonth) * 6;
    } else if (payload?.subscription === "1 Year") {
        payableAmount = Number(pricePerMonth) * 12;
    }



    const paymentInfo = {
        transactionId,
        email: user?.email,
        name: user?.name,
        payableAmount,
    };


    const paymentResponse = await paymentInitialization(paymentInfo);

    console.log(paymentResponse);

    // await UserModel.findByIdAndUpdate(userId, { membership: membershipId }, { new: true });


    return res;
};



export const MembershipService = {
    createMembershipIntoDB
};