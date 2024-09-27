import { debug } from 'console'
import dotenv from 'dotenv'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import connectDatabase from './config/dataBase'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import cors from './startup/cors'
import routers from './startup/routes'
import serializer from './startup/serializer'
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
cors(app)
serializer(app)
app.use(morgan('tiny'))
app.use(mongoSanitize())
app.use(hpp())
// app.use(express.static('public'))
app.use(
    '/api',
    rateLimit({
        max: 200,
        windowMs: 60 * 60 * 1000, // 1 hour
        message: 'Too many requests from this IP, please try again in an hour!',
    }),
)
connectDatabase()

// Stripe Webhook
// app.post('/webhook', express.raw({ type: 'application/json' }), webhookCheckout)

// app.all('*', (req, _, next) => {
//     const err = new Error(`Can't find ${req.originalUrl}`)
//     // err.status = 'fail'
//     // err.statusCode = 404
//     // err.isOperational = true
//     next(err)
// })

// app.use(errorController)

const port = Number(process.env.PORT) || 8000
routers(app, port)

app.use(globalErrorHandler)

app.listen(port, () => {
    debug('Application started')
    console.log(`Server started at http://localhost:${port}`)
})
