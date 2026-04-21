import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      required: true
    },

    brand: {
      type: String,
      trim: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    unit: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    originalPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (this: any, value: number): boolean {
          return value == null || value >= this.price;
        },
        message: "Original price must be >= price",
      },
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    reviewsCount: {
      type: Number,
      default: 0,
      min: 0
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    isFeatured: {
      type: Boolean,
      default: false
    },

    isBestSeller: {
      type: Boolean,
      default: false
    },

    estimatedDeliveryMins: {
      type: Number,
      default: 10
    },

    maxOrderQty: {
      type: Number,
      default: 10
    },

    sku: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1, isBestSeller: 1 });
productSchema.index({ name: "text", description: "text", brand: "text" });

export const Product = mongoose.model("Product", productSchema);