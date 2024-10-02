import { model } from "mongoose";
import UserSchema from "./user.schema";

const UserModel = model("user", UserSchema);
export default UserModel;