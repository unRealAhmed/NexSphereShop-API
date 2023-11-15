const Brand = require('../models/brandModel')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/appErrors')
const { getAll, deleteOne } = require('./resourceController');


exports.getAllBrands = getAll(Brand)
exports.deleteBrand = deleteOne(Brand)

exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //brand exists
  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error("Brand already exists");
  }
  //create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.user.id,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

exports.getSingleBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.query

  const brand = await Brand.findOne({ name });

  if (!brand) {
    return next(new AppError("There is no brand with this name"))
  }
  res.json({
    status: "success",
    message: "Brand fetched successfully",
    brand,
  });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("please provide a name"))
  }
  //update
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "brand updated successfully",
    brand,
  });
});
