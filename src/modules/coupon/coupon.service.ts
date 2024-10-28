import { ICoupon } from '../../models/coupon.model'
import { CouponRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { ApplyCouponDTO, CreateCouponDTO, UpdateCouponDTO } from './coupon.dtos'

export class CouponService {
    private readonly couponRepository: CouponRepository

    constructor() {
        this.couponRepository = new CouponRepository()
    }

    async createCoupon(data: CreateCouponDTO, user: ID): Promise<ICoupon> {
        const startDate = new Date(data.startDate)
        const endDate = new Date(data.endDate)

        if (startDate < new Date()) {
            throw new BadRequestError(
                ErrorMessages.START_DATE_MUST_BE_IN_FUTURE,
            )
        }

        if (endDate < startDate) {
            throw new BadRequestError(
                ErrorMessages.END_DATE_MUST_BE_AFTER_START_DATE,
            )
        }

        const existingCoupon = await this.couponRepository.findByCodeAndActive(
            data.code,
        )
        if (existingCoupon) {
            throw new BadRequestError(ErrorMessages.COUPON_ALREADY_EXISTS)
        }

        return this.couponRepository.create({
            ...data,
            startDate,
            endDate,
            createdBy: user,
        })
    }

    async applyCoupon({ code }: ApplyCouponDTO): Promise<ICoupon> {
        const coupon = await this.couponRepository.findByCodeAndActive(code)
        if (!coupon) {
            throw new NotFoundError(ErrorMessages.COUPON_NOT_FOUND_OR_INACTIVE)
        }

        await this.incrementRedemption(coupon._id)

        return coupon
    }

    async validateCoupon(code: string): Promise<boolean> {
        const coupon = await this.couponRepository.findByCodeAndActive(code)
        return !!coupon
    }

    async deactivateExpiredCoupons(): Promise<void> {
        const { success, modifiedCount } =
            await this.couponRepository.updateMany(
                {
                    endDate: { $lt: new Date() },
                    isActive: true,
                },
                { isActive: false },
            )

        if (!success || modifiedCount === 0) {
            throw new BadRequestError(ErrorMessages.NO_EXPIRED_COUPONS_FOUND)
        }
    }

    async incrementRedemption(couponId: ID): Promise<void> {
        await this.couponRepository.updateById(couponId, {
            $inc: { redemptionCount: 1 },
        })
    }

    async findAll(): Promise<ICoupon[]> {
        return this.couponRepository.findAll()
    }

    async findOne(couponId: ID): Promise<ICoupon> {
        const coupon = await this.couponRepository.findById(couponId)
        if (!coupon) {
            throw new NotFoundError(ErrorMessages.COUPON_NOT_FOUND)
        }
        return coupon
    }

    async update(couponId: ID, data: UpdateCouponDTO): Promise<ICoupon> {
        const couponExists = await this.couponRepository.findById(couponId)
        if (!couponExists) {
            throw new NotFoundError(ErrorMessages.COUPON_NOT_FOUND)
        }
        return this.couponRepository.updateById(couponId, data)
    }

    async delete(couponId: ID): Promise<void> {
        const couponExists = await this.couponRepository.findById(couponId)
        if (!couponExists) {
            throw new NotFoundError(ErrorMessages.COUPON_NOT_FOUND)
        }
        await this.couponRepository.deleteById(couponId)
    }
}
