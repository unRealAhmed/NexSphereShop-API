const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required."],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required."],
    },
    discount: {
      type: Number,
      required: [true, "Discount amount is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual properties
couponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

couponSchema.virtual("daysLeft").get(function () {
  const daysLeft = `${Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24))} Days left`;
  return daysLeft;
});

// Validation middleware
couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date cannot be less than the start date"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    next(new Error("Start date cannot be less than today"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    next(new Error("End date cannot be less than today"));
  }
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.discount <= 0 || this.discount > 100) {
    next(new Error("Discount cannot be less than 0 or greater than 100"));
  }
  next();
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
