import { ID } from './id.type'

interface ResendUserData {
    _id: ID
    fullname: string
    role: string
    active: boolean
    //  phone: string
}

export interface LoginResponse {
    user: ResendUserData
    token: string
}
