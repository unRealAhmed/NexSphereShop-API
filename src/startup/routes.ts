import { Express } from 'express'
import swaggerDocs from '../config/swagger.config'
import auth from '../modules/auth/auth.routes'
import healthCheck from '../modules/healthCheck'
import user from '../modules/user/user.routes'

export default function (app: Express, port: number) {
    app.use('/api/auth', auth)
    app.use('/api/healthCheck', healthCheck)
    app.use('/api/users', user)

    swaggerDocs(app, port)
}
