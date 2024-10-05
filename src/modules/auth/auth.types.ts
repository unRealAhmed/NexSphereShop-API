import { z } from 'zod'
import { ID } from '../../shared/types'
import { userSchemas } from '../../validations'

export type SignUpResponse = {
    _id: ID
    fullname: string
    email: string
    role: string
    active: boolean
    hasShippingAddress: boolean
    createdAt: Date
    updatedAt: Date
    accessToken: string
    // refreshToken: string
}

export type SignUpBody = z.infer<typeof userSchemas.registration.body>
export type ResetPasswordBody = z.infer<typeof userSchemas.updatePassword.body>

type ResendUserData = {
    _id: ID
    fullname: string
    role: string
    active: boolean
    //  phone: string
}

export type LoginResponse = {
    user: ResendUserData
    accessToken: string
    // refreshToken: string
}
