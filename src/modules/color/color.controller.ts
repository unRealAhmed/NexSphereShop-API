import { NextFunction, Request, Response } from 'express'
import { convertToObjectId } from '../../shared/helpers/convertToObjectId'
import { ColorService } from './color.service'

export class ColorController {
    private colorService: ColorService

    constructor() {
        this.colorService = new ColorService()
    }

    async createColor(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId

            const color = await this.colorService.createColor(req.body, userId!)
            return res.status(201).json(color)
        } catch (error) {
            next(error)
        }
    }

    async getAllColors(req: Request, res: Response, next: NextFunction) {
        try {
            const colors = await this.colorService.getAllColors()
            return res.status(200).json(colors)
        } catch (error) {
            next(error)
        }
    }

    async getColor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const color = await this.colorService.getColor(
                convertToObjectId(id),
            )

            return res.status(200).json(color)
        } catch (error) {
            next(error)
        }
    }

    async updateColor(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id

            const updatedColor = await this.colorService.updateColor(
                convertToObjectId(id),
                req.body,
            )
            return res.status(200).json(updatedColor)
        } catch (error) {
            next(error)
        }
    }

    async deleteColor(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await this.colorService.deleteColor(convertToObjectId(id))
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
