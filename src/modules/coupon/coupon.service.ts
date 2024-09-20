import { ICoupon } from '../../models'
import { CouponRepository } from '../../repositories'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'

export class CouponService {
    private couponRepository: CouponRepository

    constructor() {
        this.couponRepository = new CouponRepository()
    }

    // Helper methods for coupon expiration and days left
    private isExpired(endDate: Date): boolean {
        return endDate < new Date()
    }

    private daysLeft(endDate: Date): number {
        const currentDate = new Date()
        const timeDiff = endDate.getTime() - currentDate.getTime()
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    }

    // Validate coupon dates
    private validateDates(startDate: Date, endDate: Date): void {
        const now = new Date()
        if (endDate < startDate) {
            throw new BadRequestError(
                'End date cannot be earlier than the start date',
            )
        }
        if (startDate < now) {
            throw new BadRequestError('Start date cannot be in the past')
        }
        if (endDate < now) {
            throw new BadRequestError('End date cannot be in the past')
        }
    }

    // Validate coupon discount
    private validateDiscount(discount: number): void {
        if (discount <= 0 || discount > 100) {
            throw new BadRequestError('Discount must be between 1 and 100')
        }
    }

    // Create Coupon
    async createCoupon(data: ICoupon, userId: ID): Promise<ICoupon> {
        const { startDate, endDate, discount, code } = data

        this.validateDates(startDate, endDate)
        this.validateDiscount(discount)

        const existingCoupon = await this.couponRepository.exists({ code })
        if (existingCoupon) {
            throw new BadRequestError('Coupon already exists')
        }

        const coupon = await this.couponRepository.create({
            ...data,
            user: userId,
        })

        return coupon
    }

    // Get a single coupon with expiration logic
    async getCoupon(couponId: ID): Promise<ICoupon> {
        const coupon = await this.couponRepository.findById(couponId)

        if (this.isExpired(coupon.endDate)) {
            throw new BadRequestError('Coupon is expired')
        }

        return coupon
    }

    // Get all coupons
    async getAllCoupons(): Promise<ICoupon[]> {
        return this.couponRepository.findAll()
    }

    // Update Coupon
    async updateCoupon(couponId: ID, data: Partial<ICoupon>): Promise<ICoupon> {
        const { startDate, endDate, discount } = data

        // Validate discount and dates
        if (startDate && endDate) {
            this.validateDates(startDate, endDate)
        }
        if (discount !== undefined) {
            this.validateDiscount(discount)
        }

        const coupon = await this.couponRepository.updateById(couponId, data)

        if (!coupon) {
            throw new NotFoundError('Coupon not found')
        }

        return coupon
    }

    // Delete Coupon
    async deleteCoupon(couponId: ID): Promise<void> {
        await this.couponRepository.deleteById(couponId)
    }

    // Additional helper method to get coupon details with expiration status and days left
    async getCouponWithExpirationInfo(
        couponId: ID,
    ): Promise<{ coupon: ICoupon; isExpired: boolean; daysLeft: number }> {
        const coupon = await this.couponRepository.findById(couponId)
        const isExpired = this.isExpired(coupon.endDate)
        const daysLeft = this.daysLeft(coupon.endDate)

        return { coupon, isExpired, daysLeft }
    }
}
