import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    unit: {
      type: String
    },

    itemTotal: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active"
    },

    cancelledAt: {
      type: Date
    },

    refundInitiated: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    house: {
      type: String,
      required: true
    },

    street: {
      type: String,
      required: true
    },

    landmark: {
      type: String
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },

    note: {
      type: String
    },

    time: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryFee: {
      type: Number,
      default: 0,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    refundedAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "packing",
        "out_for_delivery",
        "delivered",
        "cancelled"
      ],
      default: "placed"
    },

    placedAt: {
      type: Date,
      default: Date.now
    },

    expectedDeliveryAt: {
      type: Date
    },

    deliveredAt: {
      type: Date
    },

    cancelledAt: {
      type: Date
    },

    cancellationReason: {
      type: String
    },

    notes: {
      type: String
    },

    deliveryPartnerName: {
      type: String
    },

    timeline: {
      type: [timelineSchema],
      default: [
        {
          status: "placed",
          note: "Order placed successfully",
          time: new Date()
        }
      ]
    }
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber =
      "MM" +
      Date.now().toString().slice(-8) +
      Math.floor(Math.random() * 1000);
  }

  next();
});

orderSchema.index({ user: 1, placedAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });

export const Order = mongoose.model("Order", orderSchema);