import { z } from "zod";


const membershipValidationSchema = z.object({
    userId: z.string(),
    paymentId: z.string().nullable().optional(),
    paymentMethod: z.string().nullable().optional(),
    startDate: z.string().optional(),
    endDate: z.date().nullable().optional(),
    subscription: z.string().optional(),
    status: z.enum(["Active", "InActive"]).optional()
});



export const MembershipValidation = {
    membershipValidationSchema
};