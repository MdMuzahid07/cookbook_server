import { model } from "mongoose";
import UserSchema from "./user.schema";

const UserModel = model("User", UserSchema);
export default UserModel;