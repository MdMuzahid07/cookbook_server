import { model } from "mongoose";
import membershipSchema from "./membership.schema";
import { TMembership } from "./membership.interface";


const MembershipModel = model<TMembership>("Membership", membershipSchema);

export default MembershipModel;