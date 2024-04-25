import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { BrandService } from './brand.service'

export class BrandController {
    private brandService: BrandService

    constructor() {
        this.brandService = new BrandService()
    }

    async createBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId

            const brand = await this.brandService.createBrand(req.body, userId!)
            return res.status(201).json(brand)
        } catch (error) {
            next(error)
        }
    }

    async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await this.brandService.getAllBrands()
            return res.status(200).json(brands)
        } catch (error) {
            next(error)
        }
    }

    async getBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const brand = await this.brandService.getBrand(
                convertToObjectId(id),
            )

            return res.status(200).json(brand)
        } catch (error) {
            next(error)
        }
    }

    async updateBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id

            const updatedBrand = await this.brandService.updateBrand(
                convertToObjectId(id),
                req.body,
            )
            return res.status(200).json(updatedBrand)
        } catch (error) {
            next(error)
        }
    }

    async deleteBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.brandService.deleteBrand(convertToObjectId(id))
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
