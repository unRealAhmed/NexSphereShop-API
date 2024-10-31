import { z } from 'zod'
import { reviewSchemas } from '../../validations'

export type CreateReviewDTO = z.infer<typeof reviewSchemas.createReview.body>
export type UpdateReviewDTO = z.infer<typeof reviewSchemas.updateReview.body>
// export type GetReviewByIdDTO = z.infer<
//     typeof reviewSchemas.getReviewById.params
// >
