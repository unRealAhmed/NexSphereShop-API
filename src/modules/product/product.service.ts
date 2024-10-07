import { IProduct } from '../../models'
import {
    BrandRepository,
    CategoryRepository,
    ProductRepository,
} from '../../repositories'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { ID } from '../../shared/types'
import { CreateProductDTO, UpdateProductDTO } from './product.dtos'

export class ProductService {
    private readonly productRepository: ProductRepository
    private readonly brandRepository: BrandRepository
    private readonly categoryRepository: CategoryRepository

    constructor() {
        this.productRepository = new ProductRepository()
        this.brandRepository = new BrandRepository()
        this.categoryRepository = new CategoryRepository()
    }

    private calculateQtyLeft(product: IProduct): number {
        return product.totalQuantity - product.totalSoldQuantity
    }

    async createProduct(data: CreateProductDTO, userId: ID): Promise<IProduct> {
        const { name, category, brand } = data

        const existingProduct = await this.productRepository.exists({ name })
        if (existingProduct) {
            throw new BadRequestError('Product already exists')
        }

        const brandFound = await this.brandRepository.findById(
            convertToObjectId(brand),
        )
        if (!brandFound) {
            throw new BadRequestError('Brand not found')
        }

        const categoryFound = await this.categoryRepository.findById(
            convertToObjectId(category),
        )
        if (!categoryFound) {
            throw new BadRequestError('Category not found')
        }

        const product = await this.productRepository.create({
            ...data,
            category: convertToObjectId(category),
            brand: convertToObjectId(brand),
            createdBy: userId,
        })

        categoryFound.products?.push(product._id)
        brandFound.products?.push(product._id)
        await categoryFound.save()
        await brandFound.save()

        return product
    }

    async getAllProducts(filter: any): Promise<IProduct[]> {
        return this.productRepository.findAll({ ...filter })
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
        data: UpdateProductDTO,
    ): Promise<IProduct> {
        if (data.brand) {
            const brandFound = await this.brandRepository.findById(
                convertToObjectId(data.brand),
            )
            if (!brandFound) {
                throw new BadRequestError('Brand not found')
            }
        }

        if (data.category) {
            const categoryFound = await this.categoryRepository.findById(
                convertToObjectId(data.category),
            )
            if (!categoryFound) {
                throw new BadRequestError('Category not found')
            }
        }

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
