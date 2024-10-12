import MembershipModel from "../membership/membership.model";
import UserModel from "../user/user.model";
import { paymentVerification } from "./payment.utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const confirmationService = async (transactionId: any, paymentStatus: string) => {

  // verifying payment
  const verifyResponse = await paymentVerification(transactionId);

  // updating the membership status to Active after successfull payment
  let result;
  if (verifyResponse && verifyResponse?.pay_status === "Successful") {
    result = await MembershipModel.findOneAndUpdate({ transactionId }, { status: "Active" }, { new: true });
  }


  // adding the membership id to user account, after successfull payment
  if (result && (result as any)?.status === "Active") {
    await UserModel.findByIdAndUpdate((result as any)?.userId, { membership: (result as any)?._id }, { new: true });
  }



  return `
    <body 
    style="font-family: 
    sans-serif;
     background-color: #f0f2f5;
      color: #333;
       margin: 0;
        padding: 0;
         display: flex; 
         align-items: center;
          justify-content: center;
           height: 100vh;"
           >

  <div style="background-color: #ffffff; padding: 40px; max-width: 450px; width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 3.1);">
    <h1 style="text-align: center;  font-size: 28px; font-weight: bold; margin-bottom: 20px;">Payment ${paymentStatus}</h1>
    
    <p style="text-align: center; font-size: 16px; margin-bottom: 30px; color: #555;">Thank you for your payment! Your transaction has been successfully completed.</p>
    
    <div style="text-align: center;">
      <a href="/" style="text-decoration: none; font-size: 16px; padding: 12px 24px; background-color: black; color:white;  border-radius: 6px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-weight: bold; display: inline-block; transition: background-color 0.3s;">Return to Home</a>
    </div>
  </div>
  
</body>
    `;
};



export const PaymentService = {
  confirmationService
};