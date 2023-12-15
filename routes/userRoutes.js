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

const {
  userValidationSchema,
  updatePasswordSchema,
  updateProfileSchema,
  shippingAddressSchema,
} = require('../validation/userValidation');

const validationMiddleware = require('../middleware/validationFunction');

const router = express.Router();

// Authentication routes
router.post('/signup', validationMiddleware(userValidationSchema), signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

// User routes
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', validationMiddleware(updatePasswordSchema), updatePassword);
router.patch('/updateMe', validationMiddleware(updateProfileSchema), updateMe);
router.patch('/updateShipping', validationMiddleware(shippingAddressSchema), updateShippingAddress);
router.delete('/deleteMe', deleteMe);

// Admin-restricted routes
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(validationMiddleware(userValidationSchema), createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
