import Product, { IProduct } from '../models/product.model'
import { AbstractRepository } from './abstract.repository'

export class ProductRepository extends AbstractRepository<IProduct> {
    constructor() {
        super(Product)
    }

    async findByStatus(status: string): Promise<IProduct[]> {
        return this.model.find({ status })
    }

    async findLowStock(threshold: number): Promise<IProduct[]> {
        return this.model.find({ totalQuantity: { $lt: threshold } })
    }
}
