import User, { IUser } from '../models/user.model'
import { ID } from '../shared/types'
import { AbstractRepository } from './abstract.repository'

export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User)
    }

    init(data: Partial<IUser>) {
        return new User(data)
    }

    findByEmail(email: string) {
        return this.model.findOne({ email }).select('+password').lean().exec()
    }

    updatePassword(id: ID, password: string) {
        return this.model
            .findByIdAndUpdate(id, { password })
            .exec() as unknown as IUser
    }

    updateShippingAddress(userId: string, address: any) {
        return this.model.findByIdAndUpdate(
            userId,
            { shippingAddress: address, hasShippingAddress: true },
            { new: true, runValidators: true },
        )
    }
}
