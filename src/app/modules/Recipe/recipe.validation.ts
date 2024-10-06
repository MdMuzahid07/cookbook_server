import { z } from "zod";

const ingredientValidationSchema = z.object({
    name: z.string().min(1, "ingredient name is required"),
    quantity: z.string().min(1, "ingredient quantity is required"),
    category: z.string().min(1, "ingredient category is required"),
});

const cookingTimeValidationSchema = z.object({
    prep: z.number().min(0, "preparation time must be a non-negative number"),
    cook: z.number().min(0, "cooking time must be a non-negative number"),
});

const ratingsValidationSchema = z.object({
    average: z.number().min(0).max(5).default(0),
    count: z.number().min(0).default(0),
});

const commentValidationSchema = z.object({
    userId: z.string().min(1, "user ID is required"),
    comment: z.string().min(1, "comment is required"),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const nutritionInfoValidationSchema = z.object({
    calories: z.number().min(0, "calories must be a non-negative number"),
    fat: z.string().min(1, "fat content is required"),
    carbohydrates: z.string().min(1, "carbohydrate content is required"),
    protein: z.string().min(1, "protein content is required"),
});

const ingredientChecklistValidationSchema = z.object({
    ingredientId: z.string().min(1, "ingredient ID is required"),
    isChecked: z.boolean().default(false),
    customName: z.string().optional(),
    customQuantity: z.string().optional(),
});

export const recipeValidationSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().min(1, "description is required"),
    ingredients: z.array(ingredientValidationSchema),
    instructions: z.array(z.string()).min(1, "at least one instruction is required"),
    images: z.string().optional(),
    author: z.string().min(1, "author is required"),
    category: z.string().min(1, "category is required"),
    cookingTime: cookingTimeValidationSchema,
    servings: z.number().min(1, "servings must be at least 1"),
    ratings: ratingsValidationSchema,
    comments: z.array(commentValidationSchema).optional(),
    upvotes: z.number().min(0).default(0),
    downvotes: z.number().min(0).default(0),
    isPremium: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    nutritionInfo: nutritionInfoValidationSchema,
    videoUrl: z.string().nullable().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"], {
        required_error: "difficulty is required",
    }),
    ingredientChecklist: z.array(ingredientChecklistValidationSchema).optional(),
    isDeleted: z.boolean().default(false),
    isPublished: z.boolean().default(true),
});



// update validation sechema 


const ingredientUpdateValidationSchema = z.object({
    name: z.string().min(1, "ingredient name is required"),
    quantity: z.string().min(1, "ingredient quantity is required"),
    category: z.string().min(1, "ingredient category is required"),
});

const cookingTimeUpdateValidationSchema = z.object({
    prep: z.number().min(0, "preparation time must be a non-negative number"),
    cook: z.number().min(0, "cooking time must be a non-negative number"),
});

const ratingsUpdateValidationSchema = z.object({
    average: z.number().min(0).max(5).default(0),
    count: z.number().min(0).default(0),
});

const commentUpdateValidationSchema = z.object({
    userId: z.string().min(1, "user ID is required"),
    comment: z.string().min(1, "comment is required"),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const nutritionInfoUpdateValidationSchema = z.object({
    calories: z.number().min(0, "calories must be a non-negative number"),
    fat: z.string().min(1, "fat content is required"),
    carbohydrates: z.string().min(1, "carbohydrate content is required"),
    protein: z.string().min(1, "protein content is required"),
});

const ingredientChecklistUpdateValidationSchema = z.object({
    ingredientId: z.string().min(1, "ingredient ID is required"),
    isChecked: z.boolean().default(false),
    customName: z.string().optional(),
    customQuantity: z.string().optional(),
});

const recipeUpdateValidationSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().min(1, "description is required"),
    ingredients: z.array(ingredientUpdateValidationSchema),
    instructions: z.array(z.string()).min(1, "at least one instruction is required"),
    images: z.array(z.string()).optional(),
    author: z.string().min(1, "author is required"),
    category: z.string().min(1, "category is required"),
    cookingTime: cookingTimeUpdateValidationSchema,
    servings: z.number().min(1, "servings must be at least 1"),
    ratings: ratingsUpdateValidationSchema,
    comments: z.array(commentUpdateValidationSchema).optional(),
    upvotes: z.number().min(0).default(0),
    downvotes: z.number().min(0).default(0),
    isPremium: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    nutritionInfo: nutritionInfoUpdateValidationSchema,
    videoUrl: z.string().nullable().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"], {
        required_error: "difficulty is required",
    }),
    ingredientChecklist: z.array(ingredientChecklistUpdateValidationSchema).optional(),
    isDeleted: z.boolean().default(false),
    isPublished: z.boolean().default(true),
});


export const RecipeValidation = {
    recipeValidationSchema,
    recipeUpdateValidationSchema
};