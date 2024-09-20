// import Product from '@models/product.model'
// import Review from '@models/review.model'
// import AppError from '@shared/utils/appErrors'
// import asyncHandler from '@shared/utils/asyncHandler'
// // import { deleteOne, getAll, getOne, updateOne } from 'resourceController.ts'

// //
// // export const getAllReviews = getAll(Review)
// // export const getReview = getOne(Review)
// // export const updateReview = updateOne(Review)
// // export const deleteReview = deleteOne(Review)

// export const setReviewUserIds = (req, res, next) => {
//     if (!req.body.product) req.body.product = req.params.productId
//     if (!req.body.user) req.body.user = req.user.id
//     next()
// }

// export const createReview = asyncHandler(async (req, res, next) => {
//     const productId = req.body.product
//     const { user } = req

//     // Check if the product ID is present in the request body
//     if (!req.body.product) {
//         throw new AppError('Product ID is required for creating a review.', 400)
//     }
//     const productFound = await Product.findById(productId)
//     if (!productFound) {
//         return next(new AppError('Product Not Found', 400))
//     }
//     //check
//     // Check if the user has already reviewed the product
//     const existingReview = await Review.findOne({
//         product: productId,
//         user: user._id,
//     })

//     if (existingReview) {
//         throw new AppError('You have already reviewed this product.', 400)
//     }

//     // If not, proceed with creating the review
//     const newReview = await Review.create({
//         ...req.body,
//         user: user._id,
//         product: productId,
//     })

//     res.status(201).json({
//         status: 'success',
//         data: {
//             review: newReview,
//         },
//     })
// })
