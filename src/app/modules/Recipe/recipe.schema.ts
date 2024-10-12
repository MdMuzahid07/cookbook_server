import { Schema } from "mongoose";
import {
    TCookingTime,
    TIngredient,
    TIngredientChecklist,
    TNutritionInfo,
    TRatings,
    TRecipe,
} from "./recipe.interface";

const IngredientSchema = new Schema<TIngredient>(
    {
        name: {
            type: String,
        },
        quantity: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    // this line will prevent separate id creation for sub data(documents)
    { _id: false },
);

const CookingTimeSchema = new Schema<TCookingTime>(
    {
        prep: {
            type: Number,
            default: 0
        },
        cook: {
            type: Number,
            default: 0
        },
    },
    { _id: false },
);

const RatingsSchema = new Schema<TRatings>({
    author: {
        type: Schema.Types.ObjectId,
        default: null
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
},
    { _id: false },
);

const NutritionInfoSchema = new Schema<TNutritionInfo>(
    {
        calories: {
            type: Number,
            default: 0
        },
        fat: {
            type: Number,
        },
        carbohydrates: {
            type: Number,
        },
        protein: {
            type: Number,
        },
    },
    { _id: false },
);

const IngredientChecklistSchema = new Schema<TIngredientChecklist>(
    {
        isChecked: {
            type: Boolean,
            default: false
        },
        customName: {
            type: String,
            default: ""
        },
        customQuantity: {
            type: String,
            default: ""
        },
    },
    { _id: false },
);

const RecipeSchema = new Schema<TRecipe>(
    {
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
        },
        ingredients: {
            type: [IngredientSchema],
        },
        instructions: {
            type: [String],
        },
        images: {
            type: String,
            default: " "
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        category: {
            type: String,
            trim: true
        },
        cookingTime: {
            type: CookingTimeSchema,
        },
        servings: {
            type: Number,
            min: 1
        },
        ratings: {
            type: [RatingsSchema],
            default: [],
        },
        comments: {
            type: [],
            ref: "Comment",
            default: []
        },
        upVotes: [{
            type: Schema.Types.ObjectId,
            ref: "Vote",
            default: []
        }],
        downVotes: [{
            type: Schema.Types.ObjectId,
            ref: "Vote",
            default: []
        }],
        isPremium: {
            type: Boolean,
            default: false
        },
        tags: {
            type: [String],
            default: []
        },
        nutritionInfo: {
            type: NutritionInfoSchema,
        },
        videoUrl: {
            type: String,
            default: null
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
        },
        ingredientChecklist: {
            type: [IngredientChecklistSchema],
            default: []
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isPublished: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true },
);


export default RecipeSchema;