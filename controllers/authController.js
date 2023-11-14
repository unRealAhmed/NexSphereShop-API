// const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const createToken = require('../utils/createToken')
const AppError = require('../utils/appErrors')
const Email = require('../utils/email')
const asyncHandler = require('../utils/asyncHandler')

// Helper function to send JWT token as a response
const sendTokenResponse = (res, user, statusCode) => {
  // Create a JWT token 
  const token = createToken(res, user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

//SIGNUP
exports.signup = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, passwordConfirm } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return next(new AppError('Email already exists', 400));
  }

  const newUser = await User.create({
    fullname,
    email,
    password,
    passwordConfirm
  });

  newUser.password = undefined;

  const url = `${req.protocol}://${req.get('host')}/me`;
  const welcomeEmail = new Email(newUser, url);

  // Send welcome email asynchronously
  welcomeEmail.sendWelcomeEmail()
    .then(() => {
      sendTokenResponse(res, newUser, 201);
    })
    .catch((error) => {
      console.error('Error sending welcome email:', error);
      sendTokenResponse(res, newUser, 201);
    });
});

//LOGIN
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError('Please provide valid email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password +active');

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Check if the provided password matches the stored hashed password
  const isPasswordCorrect = await user.passwordMatching(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Invalid email or password', 401));
  }

  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

//LOGOUT
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: new Date(Date.now() + 5 * 1000), // Set the cookie to expire in 5 seconds
  });

  res.status(200).json({ status: "success", message: 'You have been logged out.' });
};

