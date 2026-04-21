import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home"
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    house: {
      type: String,
      required: true,
      trim: true
    },

    street: {
      type: String,
      required: true,
      trim: true
    },

    landmark: {
      type: String,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      required: true,
      trim: true
    },

    pincode: {
      type: String,
      required: true,
      trim: true
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1
    },

    priceSnapshot: {
      type: Number,
      required: true
    },

    nameSnapshot: {
      type: String,
      required: true
    },

    imageSnapshot: {
      type: String
    },

    unitSnapshot: {
      type: String
    },

    addedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    phone: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    },

    addresses: [addressSchema],

    cart: [cartItemSchema],

    isActive: {
      type: Boolean,
      default: true
    },

    lastLoginAt: {
      type: Date
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);