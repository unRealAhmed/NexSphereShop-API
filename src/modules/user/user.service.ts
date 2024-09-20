import { IUser } from '../../models'
import { UserRepository } from '../../repositories'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import * as passwordService from '../../shared/helpers/password'
import { ID } from '../../shared/types'

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    // Sign up a new user
    async signUp(data: Partial<IUser>): Promise<IUser> {
        const { fullname, email, password, passwordConfirm } = data
        if (email) {
            const existingUser = await this.userRepository.findByEmail(email)
            if (existingUser) {
                throw new Error('Email already exists')
            }
        }

        const newUser: IUser = {
            fullname,
            email,
            password,
            passwordConfirm,
            role: 'user',
            active: true,
            orders: [],
            hasShippingAddress: false,
            shippingAddress: undefined,
        } as unknown as IUser

        return this.userRepository.create(newUser)
    }

    // we need to define dto for update current user without password
    async updateCurrentUser(userId: ID, data: Partial<IUser>): Promise<IUser> {
        return this.userRepository.updateById(userId, data)
    }

    //we need dto for change password
    async changePassword(
        userId: ID,
        oldPassword: string,
        newPassword: string,
    ): Promise<IUser> {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundError('User not found')

        const isPasswordCorrect = passwordService.comparePassword(
            oldPassword,
            user.password,
        )
        if (!isPasswordCorrect) throw new BadRequestError('Incorrect password')

        const hashedPassword = await passwordService.hashPassword(newPassword)
        return this.userRepository.updatePassword(userId, hashedPassword)
    }

    // Update user shipping address
    async updateShippingAddress(
        userId: ID,
        address: IUser['shippingAddress'],
    ): Promise<IUser> {
        return this.userRepository.updateById(userId, {
            shippingAddress: address,
            hasShippingAddress: true,
        })
    }

    // Find user by email
    async findByEmail(email: string): Promise<IUser | null> {
        return this.userRepository.findByEmail(email)
    }
}
