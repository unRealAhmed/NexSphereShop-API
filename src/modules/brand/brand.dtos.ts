import { z } from 'zod'
import { brandSchemas } from '../../validations'

export type CreateBrandDTO = z.infer<typeof brandSchemas.createBrand.body>

export type UpdateBrandDTO = z.infer<typeof brandSchemas.updateBrand.body>
