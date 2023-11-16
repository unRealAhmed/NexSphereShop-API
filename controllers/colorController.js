const Color = require('../models/colorModel');
const AppError = require('../utils/appErrors');
const asyncHandler = require('../utils/asyncHandler')
const { getAll, deleteOne } = require('./resourceController');


exports.getAllColors = getAll(Color)
exports.deleteColor = deleteOne(Color)

exports.getSingleColor = asyncHandler(async (req, res, next) => {
  const { name } = req.query

  const color = await Color.findOne({ name });
  if (!color) {
    return next(new AppError("There is no color with this name"))
  }
  res.json({
    status: "success",
    message: "Color fetched successfully",
    color,
  });
});

exports.createColor = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("please provide a name"))
  }
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error("Color already exists");
  }
  //create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.user.id,
  });

  res.json({
    status: "success",
    message: "Color created successfully",
    color,
  });
});

exports.updateColor = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("please provide a name"))
  }
  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
      runValidators: true
    }
  );
  if (!color) {
    return next(new AppError('color not found', 404));
  }

  res.json({
    status: "success",
    color,
  });
});