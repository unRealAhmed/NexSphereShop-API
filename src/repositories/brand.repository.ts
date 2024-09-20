import Brand, { IBrand } from '../models/brand.model'
import { AbstractRepository } from './abstract.repository'

export class BrandRepository extends AbstractRepository<IBrand> {
    constructor() {
        super(Brand)
    }
}
