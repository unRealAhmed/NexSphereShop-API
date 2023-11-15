const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');
// const resourceController = require('./resourceController');
const Product = require('../models/productModel');
// const Review = require('../models/reviewModel');
const Brand = require('../models/brandMode');
const Category = require('../models/categoryModel');


exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;
  const convertedImgs = req.files.map((file) => file?.path);

  // Check if the product already exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return next(new AppError("Product Already Exists", 400));
  }

  // Find or create the brand
  const brandFound = await Brand.findOne({ name: brand }) || await Brand.create({ name: brand });
  if (!brandFound) {
    return next(new AppError("Brand not found, please create brand first or check brand name", 400));
  }

  // Find or create the category
  const categoryFound = await Category.findOne({ name: category }) || await Category.create({ name: category });
  if (!categoryFound) {
    return next(new AppError("Category not found, please create category or check category name", 400));
  }

  // Create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
    images: convertedImgs,
  });

  // Update category with the new product
  categoryFound.products.push(product._id);
  await categoryFound.save();

  // Update brand with the new product
  brandFound.products.push(product._id);
  await brandFound.save();

  // Send response
  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});
