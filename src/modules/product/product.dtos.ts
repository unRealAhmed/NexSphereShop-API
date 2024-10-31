import { z } from 'zod'
import { productSchemas } from '../../validations'

export type CreateProductDTO = z.infer<typeof productSchemas.createProduct.body>
export type UpdateProductDTO = z.infer<typeof productSchemas.updateProduct.body>
export type ApplyDiscountDTO = z.infer<typeof productSchemas.applyDiscount.body>
// export type FindAllProductsDTO = z.infer<
//     typeof productSchemas.findAllProducts.query
// >
// export type FindProductByIdDTO = z.infer<
//     typeof productSchemas.findProductById.params
// >

export interface ProductRatingsUpdate {
    feedbacks: number
    averageRating: number
}
