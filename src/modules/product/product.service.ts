import { IProduct } from '../../models'
import Brand from '../../models/brand.model'
import Category from '../../models/category.model'
import { ProductRepository } from '../../repositories'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'

export class ProductService {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    private calculateQtyLeft(product: IProduct): number {
        return product.totalQuantity - product.totalSoldQuantity
    }

    async createProduct(
        data: Partial<IProduct>,
        userId: ID,
    ): Promise<IProduct> {
        const { name, category, brand } = data

        const existingProduct = await this.productRepository.exists({ name })
        if (existingProduct) {
            throw new BadRequestError('Product already exists')
        }

        const brandFound = await Brand.findById(brand)
        if (!brandFound) {
            throw new BadRequestError('Brand not found')
        }

        const categoryFound = await Category.findById(category)
        if (!categoryFound) {
            throw new BadRequestError('Category not found')
        }

        const product = await this.productRepository.create({
            ...data,
            user: userId,
        })

        categoryFound.products?.push(product._id)
        brandFound.products?.push(product._id)
        await categoryFound.save()
        await brandFound.save()

        return product
    }

    async getAllProducts(): Promise<IProduct[]> {
        const products = await this.productRepository.findAll()
        return products
    }

    async getProduct(productId: ID): Promise<IProduct & { qtyLeft: number }> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        return {
            ...product.toObject(),
            qtyLeft: this.calculateQtyLeft(product),
        }
    }

    async updateProduct(
        productId: ID,
        data: Partial<IProduct>,
    ): Promise<IProduct> {
        const product = await this.productRepository.updateById(productId, data)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        return product
    }

    async deleteProduct(productId: ID): Promise<void> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        await this.productRepository.deleteById(productId)
    }

    async notifyLowStock(): Promise<void> {
        // Placeholder for future implementation
    }

    async applyDiscount(productId: ID, discount: number): Promise<IProduct> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        if (!product.originalPrice) {
            product.originalPrice = product.price
        }

        product.price -= discount
        product.discount = discount
        await product.save()

        return product
    }

    async removeDiscount(productId: ID): Promise<IProduct> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        product.price = product.originalPrice
        product.discount = 0
        await product.save()

        return product
    }

    async getLowStockProducts(threshold: number): Promise<IProduct[]> {
        return this.productRepository.findLowStock(threshold)
    }
}
