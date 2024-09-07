import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { ProductService } from './product.service'

export class ProductController {
    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId
            const productData = req.body

            const product = await this.productService.createProduct(
                productData,
                userId!,
            )
            return res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.getAllProducts(req.query)
            return res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const product = await this.productService.getProduct(
                convertToObjectId(id),
            )

            return res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const productData = req.body

            const updatedProduct = await this.productService.updateProduct(
                convertToObjectId(id),
                productData,
            )
            return res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.productService.deleteProduct(convertToObjectId(id))
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async applyDiscount(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { discount } = req.body

            const updatedProduct = await this.productService.applyDiscount(
                convertToObjectId(id),
                discount,
            )
            return res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    async removeDiscount(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const updatedProduct = await this.productService.removeDiscount(
                convertToObjectId(id),
            )
            return res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }
}
