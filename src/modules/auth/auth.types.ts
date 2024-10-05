import { ID } from '../../shared/types'

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

type UserData = {
    _id: ID
    fullname: string
    role: string
    active: boolean
    //  phone: string
}

export type LoginResponse = {
    user: UserData
    accessToken: string
    // refreshToken: string
}
