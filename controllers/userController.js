const User = require("../models/userModel")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appErrors")
const { getAll, getOne, createOne, updateOne, deleteOne } = require('./resourceController');

////////// Admin Access

const userStr = 'user'

exports.getAllUsers = getAll(User);
exports.createUser = createOne(User);
exports.getUser = getOne(User, userStr);
exports.updateUser = updateOne(User, userStr);
exports.deleteUser = deleteOne(User, userStr);

//////////

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    // If the property is in the list of allowed fields, add it to the new object
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  // Set the user's ID in the request parameters for retrieving the user's data
  req.params.id = req.user.id;
  next();
};

// Update user data except for password
exports.updateMe = asyncHandler(async (req, res, next) => {
  // 1) Check if the request includes password-related fields; if so, disallow updates
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filter out any unwanted fields that should not be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// Deactivate user
exports.deleteMe = asyncHandler(async (req, res, next) => {
  // Deactivate the user's account by updating the 'active' field to 'false'
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});