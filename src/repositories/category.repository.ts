import Category, { ICategory } from '../models/category.model'
import { AbstractRepository } from './abstract.repository'

export class CategoryRepository extends AbstractRepository<ICategory> {
    constructor() {
        super(Category)
    }
}
