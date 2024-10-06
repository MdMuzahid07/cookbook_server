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
}).optional();

const commentValidationSchema = z.object({
    recipeId: z.string().optional(),
    userId: z.string().optional(),
    comment: z.string({ required_error: "comment is required" }),
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
    upvotes: z.array(z.string()).optional(),
    downvotes: z.array(z.string()).optional(),
    upvoteCount: z.number().min(0).default(0),
    downvoteCount: z.number().min(0).default(0),
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
    name: z.string().min(1, "ingredient name is required").optional(),
    quantity: z.string().min(1, "ingredient quantity is required").optional(),
    category: z.string().min(1, "ingredient category is required").optional(),
});

const cookingTimeUpdateValidationSchema = z.object({
    prep: z.number().min(0, "preparation time must be a non-negative number").optional(),
    cook: z.number().min(0, "cooking time must be a non-negative number").optional(),
});

const ratingsUpdateValidationSchema = z.object({
    average: z.number().min(0).max(5).default(0).optional(),
    count: z.number().min(0).default(0).optional(),
});

const commentUpdateValidationSchema = z.object({
    userId: z.string().min(1, "user ID is required").optional(),
    comment: z.string().min(1, "comment is required").optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

const nutritionInfoUpdateValidationSchema = z.object({
    calories: z.number().min(0, "calories must be a non-negative number").optional(),
    fat: z.string().min(1, "fat content is required").optional(),
    carbohydrates: z.string().min(1, "carbohydrate content is required").optional(),
    protein: z.string().min(1, "protein content is required").optional(),
});

const ingredientChecklistUpdateValidationSchema = z.object({
    ingredientId: z.string().min(1, "ingredient ID is required").optional(),
    isChecked: z.boolean().default(false).optional(),
    customName: z.string().optional(),
    customQuantity: z.string().optional(),
});

const recipeUpdateValidationSchema = z.object({
    title: z.string().min(1, "title is required").optional(),
    description: z.string().min(1, "description is required").optional(),
    ingredients: z.array(ingredientUpdateValidationSchema).optional(),
    instructions: z.array(z.string()).min(1, "at least one instruction is required").optional(),
    images: z.array(z.string()).optional(),
    author: z.string().min(1, "author is required").optional(),
    category: z.string().min(1, "category is required").optional(),
    cookingTime: cookingTimeUpdateValidationSchema,
    servings: z.number().min(1, "servings must be at least 1").optional(),
    ratings: ratingsUpdateValidationSchema,
    comments: z.array(commentUpdateValidationSchema).optional(),
    upVotes: z.array(z.string()).optional(),
    downVotes: z.array(z.string()).optional(),
    upVoteCount: z.number().min(0).default(0).optional(),
    downVoteCount: z.number().min(0).default(0).optional(),
    isPremium: z.boolean().default(false).optional(),
    tags: z.array(z.string()).optional(),
    nutritionInfo: nutritionInfoUpdateValidationSchema,
    videoUrl: z.string().nullable().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"], {
        required_error: "difficulty is required",
    }).optional(),
    ingredientChecklist: z.array(ingredientChecklistUpdateValidationSchema).optional(),
    isDeleted: z.boolean().default(false).optional(),
    isPublished: z.boolean().default(true).optional(),
});


export const RecipeValidation = {
    recipeValidationSchema,
    recipeUpdateValidationSchema,
    commentValidationSchema
};