import Review, { IReview } from '../models/review.model'
import { ID } from '../shared/types'
import { AbstractRepository } from './abstract.repository'

export class ReviewRepository extends AbstractRepository<IReview> {
    constructor() {
        super(Review)
    }

    async calcAverageRatings(productId: ID) {
        return this.model.aggregate([
            { $match: { product: productId } },
            {
                $group: {
                    _id: '$product',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ])
    }
}
