const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const brandRouter = require('./routes/brandRoutes');
const colorRouter = require('./routes/colorRoutes');
const orderRouter = require('./routes/orderRoutes');
const couponRouter = require('./routes/couponRoutes');
const { webhookCheckout } = require('./controllers/orderController');

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '100kb' }));

app.use(express.static('./public'));

// Stripe Webhook
app.post('/webhook', express.raw({ type: 'application/json' }), webhookCheckout);

app.use('/api', rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/colors', colorRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/coupons', couponRouter);

app.all('*', (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = 'fail';
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

app.use(errorController);

module.exports = app;
