import MembershipModel from "../membership/membership.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
const confirmationService = async (transactionId: any) => {

    // updating the membership status to Active after successfull payment

    const result = await MembershipModel.findOneAndUpdate({ transactionId }, { status: "Active" }, { new: true });

    return result;
};



export const PaymentService = {
    confirmationService
};