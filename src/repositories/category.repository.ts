import Category, { ICategory } from '../models/category.model'
import { ID } from '../shared/types'
import { AbstractRepository } from './abstract.repository'

export class CategoryRepository extends AbstractRepository<ICategory> {
    constructor() {
        super(Category)
    }

    softDelete(id: ID) {
        return this.model.findByIdAndUpdate(id, {
            deletedAt: new Date(),
            deleted: true,
        })
    }
}
