import { IColor } from '../../models/color.model'
import { ColorRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages'
import { NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { CreateColorDTO, UpdateColorDTO } from './color.dtos'

export class ColorService {
    private readonly colorRepository: ColorRepository

    constructor() {
        this.colorRepository = new ColorRepository()
    }

    async createColor(body: CreateColorDTO, userId: ID): Promise<IColor> {
        const color = await this.colorRepository.create({
            name: body.name,
            hexCode: body.hexCode,
            createdBy: userId,
        })
        return color
    }

    async getAllColors(): Promise<IColor[]> {
        return this.colorRepository.findAll()
    }

    async getColor(colorId: ID): Promise<IColor> {
        const color = await this.colorRepository.findById(colorId)
        if (!color) {
            throw new NotFoundError(ErrorMessages.COLOR_NOT_FOUND)
        }
        return color
    }

    async updateColor(colorId: ID, body: UpdateColorDTO): Promise<IColor> {
        const colorExists = await this.colorRepository.findById(colorId)
        if (!colorExists) {
            throw new NotFoundError(ErrorMessages.COLOR_NOT_FOUND)
        }

        return this.colorRepository.updateById(colorId, { ...body })
    }

    async deleteColor(colorId: ID): Promise<void> {
        const color = await this.colorRepository.findById(colorId)
        if (!color) {
            throw new NotFoundError(ErrorMessages.COLOR_NOT_FOUND)
        }

        await this.colorRepository.deleteById(colorId)
    }
}
