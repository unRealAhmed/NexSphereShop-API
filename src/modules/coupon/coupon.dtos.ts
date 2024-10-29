import { z } from 'zod'
import { couponSchemas } from '../../validations'

export type CreateCouponDTO = z.infer<typeof couponSchemas.createCoupon.body>
export type UpdateCouponDTO = z.infer<typeof couponSchemas.updateCoupon.body>
export type ApplyCouponDTO = z.infer<typeof couponSchemas.applyCoupon.params>
export type FindCouponByIdDTO = z.infer<
    typeof couponSchemas.findCouponById.params
>
