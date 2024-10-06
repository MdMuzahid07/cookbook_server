import { model } from "mongoose";
import { TComment } from "../Recipe/recipe.interface";
import CommentSchema from "./comments.schema";

const CommentModel = model<TComment>("Comment", CommentSchema);

export default CommentModel;