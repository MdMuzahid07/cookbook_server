import { Types } from "mongoose";


export interface TRecipe {
    _id: string;
    title: string;
    description: string;
    ingredients: TIngredient[];
    instructions: string[];
    images: string[];
    author: Types.ObjectId;
    category: string;
    cookingTime: TCookingTime;
    servings: number;
    ratings: TRatings;
    comments: TComment[];
    upvotes: number;
    downvotes: number;
    isPremium: boolean;
    tags: string[];
    nutritionInfo: TNutritionInfo;
    videoUrl: string | null;
    difficulty: string;
    ingredientChecklist: TIngredientChecklist[];
    isDeleted: boolean;
    isPublished: boolean;
};

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
    average: number;
    count: number;
};

export interface TComment {
    userId: Types.ObjectId;
    comment: string;
    createdAt: string;
    updatedAt: string;
};

export interface TNutritionInfo {
    calories: number;
    fat: string;
    carbohydrates: string;
    protein: string;
};

export interface TIngredientChecklist {
    ingredientId: string;
    isChecked: boolean;
    customName: string;
    customQuantity: string;
};

