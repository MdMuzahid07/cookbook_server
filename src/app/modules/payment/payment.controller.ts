import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import UserModel from "../user/user.model";

const confirmationController = async (req: Request, res: Response) => {
  const result = await PaymentService.confirmationService(req.query.transactionId, req.query.paymentStatus as string);

  // adding the membership id to user account, after successfull payment
  if (result && result?.status === "Active") {
    await UserModel.findByIdAndUpdate(result?.userId, { membership: result?._id }, { new: true });
  }

  res.send(result);
};

const cancelController = async (req: Request, res: Response) => {
  // const res = await paymentService.confirmService();

  res.send(`<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
  <div style="background-color: #ffffff; padding: 20px; max-width: 500px; width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <h1 style="text-align: center; color: #e53935;">Payment Canceled</h1>
    <p style="text-align: center; font-size: 16px; margin-bottom: 20px;">We're sorry, but your payment has been canceled. If you need further assistance, please contact support.</p>

    <div style="text-align: center;">
      <a href="/" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #e53935; border-radius: 4px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Return to Homepage</a>
    </div>
  </div>
</body>`);
};

export const paymentController = {
  confirmationController,
  cancelController,
};
