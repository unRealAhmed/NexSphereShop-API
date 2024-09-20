// import User from '@models/user.model'
// import AppError from '@shared/utils/appErrors'
// import asyncHandler from '@shared/utils/asyncHandler'
// // import {
// //   createOne,
// //   deleteOne,
// //   getAll,
// //   getOne,
// //   updateOne,
// // } from './resourceController'

// ////////// Admin Access

// const userStr = 'user'

// // export const getAllUsers = getAll(User)
// // export const createUser = createOne(User)
// // export const getUser = getOne(User, userStr)
// // export const updateUser = updateOne(User, userStr)
// // export const deleteUser = deleteOne(User, userStr)

// //////////

// const filterObj = (obj, ...allowedFields) => {
//     const newObj = {}
//     Object.keys(obj).forEach(el => {
//         // If the property is in the list of allowed fields, add it to the new object
//         if (allowedFields.includes(el)) {
//             newObj[el] = obj[el]
//         }
//     })
//     return newObj
// }

// export const getMe = (req, res, next) => {
//     // Set the user's ID in the request parameters for retrieving the user's data
//     req.params.id = req.user.id
//     next()
// }

// // Update user data except for password
// export const updateMe = asyncHandler(async (req, res, next) => {
//     // 1) Check if the request includes password-related fields;; if so, disallow updates
//     if (req.body.password || req.body.passwordConfirm) {
//         return next(
//             new AppError(
//                 'This route is not for password updates. Please use /updateMyPassword.',
//                 400,
//             ),
//         )
//     }

//     // 2) Filter out any unwanted fields that should not be updated
//     const filteredBody = filterObj(req.body, 'fullname', 'email')

//     const updatedUser = await User.findByIdAndUpdate(
//         req.user.id,
//         filteredBody,
//         {
//             new: true,
//             runValidators: true,
//         },
//     )

//     res.status(200).json({
//         status: 'success',
//         data: {
//             user: updatedUser,
//         },
//     })
// })

// // Deactivate user
// export const deleteMe = asyncHandler(async (req, res, next) => {
//     // Deactivate the user's account by updating the 'active' field to 'false'
//     await User.findByIdAndUpdate(req.user.id, { active: false })

//     res.status(204).json({
//         status: 'success',
//         data: null,
//     })
// })

// export const updateShippingAddress = asyncHandler(async (req, res, next) => {
//     const {
//         firstName,
//         lastName,
//         address,
//         city,
//         postalCode,
//         province,
//         phone,
//         country,
//     } = req.body
//     const user = await User.findByIdAndUpdate(
//         req.user.id,
//         {
//             shippingAddress: {
//                 firstName,
//                 lastName,
//                 address,
//                 city,
//                 postalCode,
//                 province,
//                 phone,
//                 country,
//             },
//             hasShippingAddress: true,
//         },
//         {
//             new: true,
//             runValidators: true,
//         },
//     )
//     //send response
//     res.json({
//         status: 'success',
//         message: 'User shipping address updated successfully',
//         user,
//     })
// })
