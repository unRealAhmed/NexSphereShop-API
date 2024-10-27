import { Express } from 'express'
import swaggerDocs from '../config/swagger.config'
import auth from '../modules/auth/auth.routes'
import brand from '../modules/brand/brand.routes'
import category from '../modules/category/category.routes'
import color from '../modules/color/color.routes'
import coupon from '../modules/coupon/coupon.routes'
import healthCheck from '../modules/healthCheck'
import product from '../modules/product/product.routes'
import user from '../modules/user/user.routes'

export default function (app: Express, port: number) {
    app.use('/api/auth', auth)
    app.use('/api/healthCheck', healthCheck)
    app.use('/api/users', user)
    app.use('/api/products', product)
    app.use('/api/categories', category)
    app.use('/api/brands', brand)
    app.use('/api/colors', color)
    app.use('/api/coupons', coupon)

    swaggerDocs(app, port)
}
