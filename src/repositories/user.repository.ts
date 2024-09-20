import User, { IUser } from '../models/user.model'
import { ID } from '../shared/types'
import { AbstractRepository } from './abstract.repository'

export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User)
    }

    async findByEmail(email: string) {
        return this.findOne({ email })
    }

    async updatePassword(id: ID, password: string): Promise<IUser> {
        return this.model
            .findByIdAndUpdate(id, { password })
            .exec() as unknown as IUser
    }

    async updateShippingAddress(userId: string, address: any) {
        return this.model.findByIdAndUpdate(
            userId,
            { shippingAddress: address, hasShippingAddress: true },
            { new: true, runValidators: true },
        )
    }
}
