import Coupon, { ICoupon } from '../models/coupon.model'
import { AbstractRepository } from './abstract.repository'

export class CouponRepository extends AbstractRepository<ICoupon> {
    constructor() {
        super(Coupon)
    }
}
