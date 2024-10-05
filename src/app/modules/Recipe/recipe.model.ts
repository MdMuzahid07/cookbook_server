import { model } from "mongoose";
import { TRecipe } from "./recipe.interface";
import RecipeSchema from "./recipe.schema";


const RecipeModel = model<TRecipe>("Recipe", RecipeSchema);

export default RecipeModel;