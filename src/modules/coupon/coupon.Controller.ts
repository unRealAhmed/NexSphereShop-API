import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { CouponService } from './coupon.service'

export class CouponController {
    private couponService: CouponService

    constructor() {
        this.couponService = new CouponService()
    }

    async createCoupon(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId
            const coupon = await this.couponService.createCoupon(
                req.body,
                userId!,
            )
            return res.status(201).json(coupon)
        } catch (error) {
            next(error)
        }
    }

    async getAllCoupons(req: Request, res: Response, next: NextFunction) {
        try {
            const coupons = await this.couponService.findAll()
            return res.status(200).json(coupons)
        } catch (error) {
            next(error)
        }
    }

    async getCoupon(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const coupon = await this.couponService.findOne(
                convertToObjectId(id),
            )
            return res.status(200).json(coupon)
        } catch (error) {
            next(error)
        }
    }

    async updateCoupon(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const updatedCoupon = await this.couponService.update(
                convertToObjectId(id),
                req.body,
            )
            return res.status(200).json(updatedCoupon)
        } catch (error) {
            next(error)
        }
    }

    async deleteCoupon(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await this.couponService.delete(convertToObjectId(id))
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async applyCoupon(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.body
            const coupon = await this.couponService.applyCoupon(code)
            return res.status(200).json(coupon)
        } catch (error) {
            next(error)
        }
    }

    async deactivateExpiredCoupons(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            await this.couponService.deactivateExpiredCoupons()
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
