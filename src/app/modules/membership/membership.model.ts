import { model } from "mongoose";
import membershipSchema from "./membership.schema";


const MembershipModel = model("Membership", membershipSchema);

export default MembershipModel;