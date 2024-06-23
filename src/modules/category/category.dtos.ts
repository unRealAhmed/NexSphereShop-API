import { z } from 'zod'
import { categorySchemas } from '../../validations'

export type CreateCategoryDTO = z.infer<
    typeof categorySchemas.createCategory.body
>
export type UpdateCategoryDTO = z.infer<
    typeof categorySchemas.updateCategory.body
>
// export type FindAllProductsDTO = z.infer<
//     typeof productSchemas.findAllProducts.query
// >
