import { IProduct } from '../../models'
import {
    BrandRepository,
    CategoryRepository,
    ProductRepository,
} from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages' // Import the error messages
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
        const brandFound = await this.brandRepository.findById(
            convertToObjectId(data.brand),
        )
        if (!brandFound) {
            throw new BadRequestError(ErrorMessages.BRAND_NOT_FOUND)
        }

        const categoryFound = await this.categoryRepository.findById(
            convertToObjectId(data.category),
        )
        if (!categoryFound) {
            throw new BadRequestError(ErrorMessages.CATEGORY_NOT_FOUND)
        }

        const product = await this.productRepository.create({
            ...data,
            category: categoryFound._id,
            brand: brandFound._id,
            createdBy: userId,
            originalPrice: data.price,
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

    async getProduct(productId: ID) {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)
        }

        return {
            ...product,
            qtyLeft: this.calculateQtyLeft(product),
        }
    }

    async updateProduct(
        productId: ID,
        data: UpdateProductDTO,
    ): Promise<IProduct> {
        const productExist = await this.productRepository.findById(productId)

        if (!productExist)
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)

        if (data.brand) {
            const brandFound = await this.brandRepository.findById(
                convertToObjectId(data.brand),
            )
            if (!brandFound) {
                throw new BadRequestError(ErrorMessages.BRAND_NOT_FOUND)
            }
        }

        if (data.category) {
            const categoryFound = await this.categoryRepository.findById(
                convertToObjectId(data.category),
            )
            if (!categoryFound) {
                throw new BadRequestError(ErrorMessages.CATEGORY_NOT_FOUND)
            }
        }

        return this.productRepository.updateById(productId, {
            ...data,
            originalPrice: data.price ? data.price : productExist.originalPrice,
        })
    }

    async deleteProduct(productId: ID): Promise<void> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)
        }

        await this.productRepository.deleteById(productId)
    }

    async notifyLowStock(): Promise<void> {
        // Placeholder for future implementation
    }

    async applyDiscount(productId: ID, discount: number): Promise<IProduct> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)
        }

        const originalPrice = product.originalPrice || product.price
        const newPrice = originalPrice - discount

        return this.productRepository.updateById(productId, {
            price: newPrice,
            discount,
            originalPrice,
        })
    }

    async removeDiscount(productId: ID): Promise<IProduct> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND)
        }

        return this.productRepository.updateById(productId, {
            price: product.originalPrice,
            discount: 0,
        })
    }

    async getLowStockProducts(threshold: number): Promise<IProduct[]> {
        return this.productRepository.findLowStock(threshold)
    }
}
