import { Types } from "mongoose";


export interface TIngredient {
    name: string;
    quantity: string;
    category: string;
};

export interface TCookingTime {
    prep: number;
    cook: number;
};

export interface TRatings {
    author?: Types.ObjectId;
    rating: number;
};

export interface TComment {
    recipeId?: Types.ObjectId
    userId?: Types.ObjectId;
    comment: string;
};

export interface TNutritionInfo {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
};

export interface TIngredientChecklist {
    ingredientId: string;
    isChecked: boolean;
    customName: string;
    customQuantity: string;
};

export interface TRecipe {
    _id: string;
    title: string;
    description: string;
    ingredients: TIngredient[];
    instructions: string[];
    images: string;
    author: Types.ObjectId;
    category: string;
    cookingTime: TCookingTime;
    servings: number;
    ratings: TRatings[];
    comments: TComment[];
    upVotes: Types.ObjectId[];
    downVotes: Types.ObjectId[];
    isPremium: boolean;
    tags: string[];
    nutritionInfo: TNutritionInfo;
    videoUrl: string | null;
    difficulty: string;
    ingredientChecklist: TIngredientChecklist[];
    isDeleted: boolean;
    isPublished: boolean;
};

