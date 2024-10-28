import Coupon, { ICoupon } from '../models/coupon.model'
import { AbstractRepository } from './abstract.repository'

export class CouponRepository extends AbstractRepository<ICoupon> {
    constructor() {
        super(Coupon)
    }

    async findByCodeAndActive(code: string): Promise<ICoupon | null> {
        return this.findOne({
            code,
            isActive: true,
            startDate: { $lte: new Date() },
            endDate: { $gte: new Date() },
        })
    }
}
