// Load environmental variables
require("dotenv").config({ path: './config.env' });

// Import necessary modules
const express = require('express');
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const hpp = require('hpp');
const connectDatabase = require('./utils/dataBase');
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const brandRouter = require('./routes/brandRoutes');
const colorRouter = require('./routes/colorRoutes');
const orderRouter = require('./routes/orderRoutes');
const { webhookCheckout } = require('./controllers/orderController');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Enhance security with various middleware
app.use(helmet()); // Set various HTTP headers for security
app.use(mongoSanitize()); // Sanitize data against NoSQL injection attacks
app.use(xss()); // Prevent XSS attacks
app.use(hpp());

// Parse cookies, enable CORS, and handle JSON parsing
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: '100kb' }));

// Serve static files
app.use(express.static('./public'));

// Stripe Webhook
app.post("/webhook", express.raw({ type: "application/json" }), webhookCheckout);

// Rate limiting middleware to prevent abuse
app.use('/api', rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/brands', brandRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/orders", orderRouter);

// Connect to the database
connectDatabase();

// Error Handling Middleware: Handle requests for undefined routes
app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

// Error Controller: Handle errors generated during request processing
app.use(errorController);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
