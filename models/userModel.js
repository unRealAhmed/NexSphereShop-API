const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { default: validator } = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please provide your full name'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide your email address'],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // Custom validation to check if password and passwordConfirm match
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false, // Hide active field from query results
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// COMPARING PASSWORDS
userSchema.methods.passwordMatching = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// PASSWORD CHANGE CHECK
userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    // Convert passwordChangedAt timestamp to seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

//PASSWORD CHANGE CHECKER
userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    // Convert passwordChangedAt timestamp to seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

// HASH PASSWORD before saving the user
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt with a cost factor of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    // Set passwordConfirm to undefined as it's no longer needed
    this.passwordConfirm = undefined;

    // Update passwordChangedAt if it's not a new user
    if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;

    next();
  } catch (error) {
    return next(error);
  }
});

//PASSWORD RESET TOKEN GENERATOR
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and set it on the user
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set an expiration time for the token (10 minutes)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Return the unhashed token for use in the email
  return resetToken;
};

const User = mongoose.model('User', userSchema)

module.exports = User