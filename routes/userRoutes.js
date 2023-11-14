const express = require('express');
const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
  // restrictTo,
} = authController;

// const {
//   getMe,
//   getUser,
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
//   updateMe,
//   deleteMe,
// } = userController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
// router.get('/me', getMe, getUser);
// router.patch('/updateMe', updateMe);
// router.delete('/deleteMe', deleteMe);

// router.use(restrictTo('admin'));

// router
//   .route('/')
//   .get(getAllUsers)
//   .post(createUser);

// router
//   .route('/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

module.exports = router;