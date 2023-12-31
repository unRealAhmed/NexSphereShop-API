const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');
const { getAll, getOne } = require('./resourceController');
const Product = require('../models/productModel');
// eslint-disable-next-line no-unused-vars
const Review = require('../models/reviewModel');
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');


const productType = 'product'
exports.getAllProducts = getAll(Product)
exports.getSingleProduct = getOne(Product, productType)

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;
  const userId = req.user.id
  // const convertedImgs = req.files.map((file) => file?.path);

  // Check if the product already exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return next(new AppError("Product Already Exists", 400));
  }

  // Find or create the brand
  const brandFound = await Brand.findOne({ name: brand })
  if (!brandFound) {
    return next(new AppError("Brand not found, please create brand first or check brand name", 400));
  }

  // Find or create the category
  const categoryFound = await Category.findOne({ name: category })
  if (!categoryFound) {
    return next(new AppError("Category not found, please create category or check category name", 400));
  }
  // Create th  e product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: userId,
    price,
    totalQty,
    brand,
  });
  // images: convertedImgs,
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

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  res.json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  // Find the product by ID
  const product = await Product.findById(productId);

  // Check if the product exists
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Delete all reviews associated with the product
  // await Review.deleteMany({ product: productId });

  // Delete the product
  await Product.deleteOne({ _id: productId });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});