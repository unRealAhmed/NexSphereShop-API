// import Brand from '@models/brand.model'
// // import { deleteOne, getAll } from 'resourceController.ts'
// import AppError from '@utils/appErrors'
// import asyncHandler from '@utils/asyncHandler'

// // export const getAllBrands = getAll(Brand)
// // export const deleteBrand = deleteOne(Brand)

// export const createBrand = asyncHandler(async (req, res) => {
//     const { name } = req.body
//     //brand exists
//     const brandFound = await Brand.findOne({ name })
//     if (brandFound) {
//         throw new Error('Brand already exists')
//     }
//     //create
//     const brand = await Brand.create({
//         name: name.toLowerCase(),
//         user: req.user.id,
//     })

//     res.json({
//         status: 'success',
//         message: 'Brand created successfully',
//         brand,
//     })
// })

// export const getSingleBrand = asyncHandler(async (req, res, next) => {
//     const { name } = req.query

//     const brand = await Brand.findOne({ name })

//     if (!brand) {
//         return next(new AppError('There is no brand with this name', 400))
//     }
//     res.json({
//         status: 'success',
//         message: 'Brand fetched successfully',
//         brand,
//     })
// })

// export const updateBrand = asyncHandler(async (req, res, next) => {
//     const { name } = req.body
//     if (!name) {
//         return next(new AppError('please provide a name', 400))
//     }
//     //update
//     const brand = await Brand.findByIdAndUpdate(
//         req.params.id,
//         {
//             name,
//         },
//         {
//             new: true,
//         },
//     )
//     if (!brand) {
//         return next(new AppError('brand not found', 404))
//     }

//     res.json({
//         status: 'success',
//         message: 'brand updated successfully',
//         brand,
//     })
// })
