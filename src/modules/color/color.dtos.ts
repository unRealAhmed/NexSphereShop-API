import { z } from 'zod'
import { colorSchemas } from '../../validations'

export type CreateColorDTO = z.infer<typeof colorSchemas.createColor.body>
export type UpdateColorDTO = z.infer<typeof colorSchemas.updateColor.body>
