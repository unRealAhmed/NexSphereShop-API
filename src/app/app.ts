import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
// import brandRouter from 'modules/brand/routes/brandRoutes.ts'
// import categoryRouter from 'modules/category/routes/categoryRoutes.ts'
// import colorRouter from 'modules/color/routes/colorRoutes.ts'
// import couponRouter from 'modules/coupon/routes/couponRoutes.ts'
// import orderRouter from 'modules/order/routes/orderRoutes.ts'
// import productRouter from 'modules/product/routes/productRoutes.ts'
// import userRouter from 'modules/user/routes/userRoutes.ts'

const app = express()
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

app.use(cookieParser(process.env.JWT_SECRET_KEY))
app.use(cors())
app.options('*', cors())
app.use(express.json({ limit: '100kb' }))

app.use(express.static('./public'))

// Stripe Webhook
// app.post('/webhook', express.raw({ type: 'application/json' }), webhookCheckout)

app.use(
    '/api',
    rateLimit({
        max: 200,
        windowMs: 60 * 60 * 1000, // 1 hour
        message: 'Too many requests from this IP, please try again in an hour!',
    }),
)

// app.use('/api/v1/users', userRouter)
// app.use('/api/v1/products', productRouter)
// app.use('/api/v1/category', categoryRouter)
// app.use('/api/v1/brands', brandRouter)
// app.use('/api/v1/colors', colorRouter)
// app.use('/api/v1/orders', orderRouter)
// app.use('/api/v1/coupons', couponRouter)

app.all('*', (req, _, next) => {
    const err = new Error(`Can't find ${req.originalUrl}`)
    // err.status = 'fail'
    // err.statusCode = 404
    // err.isOperational = true
    next(err)
})

// app.use(errorController)

export default app
