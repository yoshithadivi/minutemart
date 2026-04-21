import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        icon: {
            type: String
        },

        image: {
            type: String
        },

        bannerColor: {
            type: String,
            default: "#16a34a"
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        },

        isFeatured: {
            type: Boolean,
            default: false
        },

        sortOrder: {
            type: Number,
            default: 0
        },

        seoTitle: {
            type: String
        },

        seoDescription: {
            type: String
        }
    },
    { timestamps: true }
);

categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1, sortOrder: 1 });

export const Category = mongoose.model("Category", categorySchema);