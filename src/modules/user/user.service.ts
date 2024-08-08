import { IUser } from '../../models'
import { UserRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages' // Importing error messages
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import * as passwordService from '../../shared/helpers/password'
import { ID } from '../../shared/types'
import {
    AssignRoleDTO,
    ChangePasswordDTO,
    CreateUserDTO,
    UpdateCurrentUserDTO,
    UpdateShippingAddressDTO,
    UpdateUserDTO,
} from './user.dtos'

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async createUser(data: CreateUserDTO): Promise<IUser> {
        const { email, password } = data

        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new BadRequestError(ErrorMessages.EMAIL_ALREADY_IN_USE)
        }

        const hashedPassword = await passwordService.hashPassword(password)
        const userData = { ...data, password: hashedPassword, active: true }

        return this.userRepository.create(userData)
    }

    async findAllUsers(filter: any): Promise<IUser[]> {
        return this.userRepository.findAll({ ...filter })
    }

    async findAllAdmins(): Promise<IUser[]> {
        return this.userRepository.findAll({
            filter: { role: 'admin' },
        })
    }

    async findById(userId: ID): Promise<IUser> {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
        return user
    }

    async updateUser(userId: ID, data: UpdateUserDTO): Promise<IUser> {
        const updatedUser = await this.userRepository.updateById(userId, data)
        if (!updatedUser) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
        return updatedUser
    }

    async getMe(userId: ID): Promise<IUser> {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
        return user
    }

    async deleteUser(userId: ID): Promise<void> {
        const deletedUser = await this.userRepository.deleteById(userId)
        if (!deletedUser) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
    }

    async assignRole(userId: ID, role: AssignRoleDTO['role']): Promise<IUser> {
        const updatedUser = await this.userRepository.updateById(userId, {
            role,
        })
        if (!updatedUser) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
        return updatedUser
    }

    async updateCurrentUser(
        userId: ID,
        data: UpdateCurrentUserDTO,
    ): Promise<IUser> {
        const updatedUser = await this.userRepository.updateById(userId, data)
        if (!updatedUser)
            throw new BadRequestError(ErrorMessages.FAILED_TO_UPDATE_USER)
        return updatedUser
    }

    async changePassword(userId: ID, data: ChangePasswordDTO): Promise<IUser> {
        const { oldPassword, newPassword, passwordConfirm } = data
        const user = await this.userRepository.findById(userId)
        if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)

        if (newPassword !== passwordConfirm) {
            throw new BadRequestError(ErrorMessages.NEW_PASSWORDS_MUST_MATCH)
        }

        const isPasswordCorrect = passwordService.comparePassword(
            oldPassword,
            user.password,
        )
        if (!isPasswordCorrect)
            throw new BadRequestError(ErrorMessages.INCORRECT_PASSWORD)

        const hashedPassword = await passwordService.hashPassword(newPassword)
        return this.userRepository.updatePassword(userId, hashedPassword)
    }

    async updateShippingAddress(
        userId: ID,
        data: UpdateShippingAddressDTO,
    ): Promise<IUser> {
        const { shippingAddress } = data
        return this.userRepository.updateById(userId, {
            shippingAddress,
            hasShippingAddress: true,
        })
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new NotFoundError(ErrorMessages.USER_NOT_FOUND)
        return user
    }
}
