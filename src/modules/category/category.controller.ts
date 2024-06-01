import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { CategoryService } from './category.service'

export class CategoryController {
    private categoryService: CategoryService

    constructor() {
        this.categoryService = new CategoryService()
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId

            const category = await this.categoryService.createCategory(
                req.body,
                userId!,
            )
            return res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getAllCategories()
            return res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const category = await this.categoryService.getCategory(
                convertToObjectId(id),
            )

            return res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id

            const updatedCategory = await this.categoryService.updateCategory(
                convertToObjectId(id),
                req.body,
            )
            return res.status(200).json(updatedCategory)
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.categoryService.deleteCategory(convertToObjectId(id))
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
