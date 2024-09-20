// import Color from '@models/color.model'
// import AppError from '@shared/utils/appErrors'
// import asyncHandler from '@shared/utils/asyncHandler'
// // import { deleteOne, getAll } from 'resourceController.ts'

// // export const getAllColors = getAll(Color)
// // export const deleteColor = deleteOne(Color)

// export const getSingleColor = asyncHandler(async (req, res, next) => {
//     const { name } = req.query

//     const color = await Color.findOne({ name })
//     if (!color) {
//         return next(new AppError('There is no color with this name', 400))
//     }
//     res.json({
//         status: 'success',
//         message: 'Color fetched successfully',
//         color,
//     })
// })

// export const createColor = asyncHandler(async (req, res, next) => {
//     const { name } = req.body
//     if (!name) {
//         return next(new AppError('please provide a name', 400))
//     }
//     const colorFound = await Color.findOne({ name })
//     if (colorFound) {
//         throw new Error('Color already exists')
//     }
//     //create
//     const color = await Color.create({
//         name: name.toLowerCase(),
//         user: req.user.id,
//     })

//     res.json({
//         status: 'success',
//         message: 'Color created successfully',
//         color,
//     })
// })

// export const updateColor = asyncHandler(async (req, res, next) => {
//     const { name } = req.body
//     if (!name) {
//         return next(new AppError('please provide a name', 400))
//     }
//     //update
//     const color = await Color.findByIdAndUpdate(
//         req.params.id,
//         {
//             name,
//         },
//         {
//             new: true,
//             runValidators: true,
//         },
//     )
//     if (!color) {
//         return next(new AppError('color not found', 404))
//     }

//     res.json({
//         status: 'success',
//         color,
//     })
// })
