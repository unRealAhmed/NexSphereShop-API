const Category = require('../models/categoryModel');
const AppError = require('../utils/appErrors');
const asyncHandler = require('../utils/asyncHandler')
const { getAll, deleteOne } = require('./resourceController');


exports.getAllCategories = getAll(Category)
exports.deleteCategory = deleteOne(Category)

exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.query

  const category = await Category.findOne({ name });
  if (!category) {
    return next(new AppError("There is no category with this name"))
  }
  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("please provide a name"))
  }
  //category exists
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
  //create
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.user.id,
    // image: req?.file?.path,
  });

  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("please provide a name"))
  }
  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  if (!category) {
    return next(new AppError('category not found', 404));
  }
  res.json({
    status: "success",
    message: "category updated successfully",
    category,
  });
});