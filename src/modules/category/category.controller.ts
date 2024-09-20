// import AppError from '@shared/utils/appErrors'
// import asyncHandler from '@shared/utils/asyncHandler'
// // import { deleteOne, getAll } from 'resourceController.ts'
// import Category from '@models/category.model'

// // export const getAllCategories = getAll(Category)
// // export const deleteCategory = deleteOne(Category)

// export const getSingleCategory = asyncHandler(async (req, res, next) => {
//     const { name } = req.query

//     const category = await Category.findOne({ name })
//     if (!category) {
//         return next(new AppError('There is no category with this name', 400))
//     }
//     res.json({
//         status: 'success',
//         message: 'Category fetched successfully',
//         category,
//     })
// })

// export const createCategory = asyncHandler(async (req, res, next) => {
//     const { name } = req.body
//     if (!name) {
//         return next(new AppError('please provide a name', 400))
//     }
//     //category exists
//     const categoryFound = await Category.findOne({ name })
//     if (categoryFound) {
//         throw new Error('Category already exists')
//     }
//     //create
//     const category = await Category.create({
//         name: name.toLowerCase(),
//         user: req.user.id,
//         image: req.file.path,
//     })

//     res.json({
//         status: 'success',
//         message: 'Category created successfully',
//         category,
//     })
// })

// export const updateCategory = asyncHandler(async (req, res, next) => {
//     const { name } = req.body
//     if (!name) {
//         return next(new AppError('please provide a name', 400))
//     }
//     //update
//     const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//             name,
//         },
//         {
//             new: true,
//         },
//     )
//     if (!category) {
//         return next(new AppError('category not found', 404))
//     }
//     res.json({
//         status: 'success',
//         message: 'category updated successfully',
//         category,
//     })
// })
