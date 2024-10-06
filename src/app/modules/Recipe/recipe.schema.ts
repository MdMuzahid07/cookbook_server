import { Schema } from "mongoose";
import {
    TComment,
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
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
    },
    // this line will prevent separate id creation for sub data(documents)
    { _id: false },
);

const CookingTimeSchema = new Schema<TCookingTime>(
    {
        prep: {
            type: Number,
            required: true,
            min: 0
        },
        cook: {
            type: Number,
            required: true,
            min: 0
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

const CommentSchema = new Schema<TComment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
);

const NutritionInfoSchema = new Schema<TNutritionInfo>(
    {
        calories: {
            type: Number,
            required: true,
            min: 0
        },
        fat: {
            type: String,
            required: true
        },
        carbohydrates: {
            type: String,
            required: true
        },
        protein: {
            type: String,
            required: true
        },
    },
    { _id: false },
);

const IngredientChecklistSchema = new Schema<TIngredientChecklist>(
    {
        ingredientId: {
            type: String,
            required: true
        },
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
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: [IngredientSchema],
            required: true
        },
        instructions: {
            type: [String],
            required: true
        },
        images: {
            type: String,
            default: " "
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        cookingTime: {
            type: CookingTimeSchema,
            required: true
        },
        servings: {
            type: Number,
            required: true,
            min: 1
        },
        ratings: {
            type: [RatingsSchema],
            required: true,
            default: [],
        },
        comments: {
            type: [CommentSchema],
            default: []
        },
        upvotes: {
            type: Number,
            default: 0,
            min: 0
        },
        downvotes: {
            type: Number,
            default: 0,
            min: 0
        },
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
            required: true
        },
        videoUrl: {
            type: String,
            default: null
        },
        difficulty: {
            type: String,
            required: true,
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