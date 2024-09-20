// import Coupon from '@models/coupon.model'
// import AppError from '@shared/utils/appErrors'
// import asyncHandler from '@shared/utils/asyncHandler'

// export const createCoupon = asyncHandler(async (req, res, next) => {
//     const { code, startDate, endDate, discount } = req.body
//     //check if coupon already exists
//     const couponsExists = await Coupon.findOne({
//         code,
//     })
//     if (couponsExists) {
//         return next(new AppError('Coupon already exists', 400))
//     }
//     //check if discount is a number
//     if (Number.isNaN(discount)) {
//         return next(new AppError('Discount value must be a number', 400))
//     }
//     //create coupon
//     const coupon = await Coupon.create({
//         code: code,
//         startDate,
//         endDate,
//         discount,
//         user: req.user.id,
//     })
//     //send the response
//     res.status(201).json({
//         status: 'success',
//         message: 'Coupon created successfully',
//         coupon,
//     })
// })

// export const getAllCoupons = asyncHandler(async (req, res) => {
//     const coupons = await Coupon.find()
//     res.status(200).json({
//         status: 'success',
//         message: 'All coupons',
//         coupons,
//     })
// })

// export const getCoupon = asyncHandler(async (req, res, next) => {
//     const coupon = await Coupon.findById(req.params.id)
//     //check if is not found
//     if (coupon === null) {
//         return next(new AppError('Coupon not found', 404))
//     }
//     //check if expired
//     // if (coupon.isExpired) {
//     //     return next(new AppError('Coupon Expired', 400))
//     // }
//     res.json({
//         status: 'success',
//         message: 'Coupon fetched',
//         coupon,
//     })
// })

// export const updateCoupon = asyncHandler(async (req, res, next) => {
//     const { code, startDate, endDate, discount } = req.body
//     const coupon = await Coupon.findByIdAndUpdate(
//         req.params.id,
//         {
//             code: code?.toUpperCase(),
//             discount,
//             startDate,
//             endDate,
//         },
//         {
//             new: true,
//         },
//     )

//     if (!coupon) {
//         return next(new AppError('No coupon with that id', 404))
//     }

//     res.json({
//         status: 'success',
//         message: 'Coupon updated successfully',
//         coupon,
//     })
// })

// export const deleteCoupon = asyncHandler(async (req, res, next) => {
//     const coupon = await Coupon.findByIdAndDelete(req.params.id)

//     if (!coupon) {
//         return next(new AppError('No coupon with that id', 404))
//     }

//     res.json({
//         status: 'success',
//         message: 'Coupon deleted successfully',
//     })
// })
