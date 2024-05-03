import Brand, { IBrand } from '../models/brand.model'
import { ID } from '../shared/types'
import { AbstractRepository } from './abstract.repository'

export class BrandRepository extends AbstractRepository<IBrand> {
    constructor() {
        super(Brand)
    }

    softDelete(id: ID) {
        return this.model.findByIdAndUpdate(id, {
            deleted: true,
        })
    }
}
