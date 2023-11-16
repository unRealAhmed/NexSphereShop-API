const express = require('express');
const {
  getMe,
  getUser,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateShippingAddress
} = require('../controllers/userController');

const {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword,
  protect,
  restrictTo,
  updatePassword,
} = require('../controllers/authController');

const router = express.Router();
// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

// User routes
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updateShipping', updateShippingAddress);

// Admin-restricted routes
router.use(restrictTo('admin'));

// User management routes
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;