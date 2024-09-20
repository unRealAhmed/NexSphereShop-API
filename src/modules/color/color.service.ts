import { FilterQuery } from 'mongoose'
import { IColor } from '../../models'
import { ColorRepository } from '../../repositories'
import { ID } from '../../shared/types'

export class ColorService {
    private readonly colorRepo: ColorRepository
    constructor() {
        this.colorRepo = new ColorRepository()
    }

    async getAllColors(
        filter?: FilterQuery<Partial<IColor>>,
        skip?: number,
        limit?: number,
        sortField: keyof IColor = 'createdAt',
        sortDirection: -1 | 1 = -1,
    ): Promise<IColor[]> {
        return this.colorRepo.findAll({
            filter,
            skip,
            take: limit,
            sort: sortField as string,
            sortDirection,
        })
    }

    async getColorByName(name: string): Promise<IColor> {
        return this.colorRepo.findOne({ name })
    }

    async createColor(data: { name: string; userId: ID }): Promise<IColor> {
        const color = await this.colorRepo.findOne({ name: data.name })
        if (color) {
            throw new Error('Color already exists')
        }
        return this.colorRepo.create({
            name: data.name.toLowerCase(),
            user: data.userId,
        })
    }

    async updateColor(id: ID, name: string): Promise<IColor> {
        return this.colorRepo.updateById(id, { name })
    }

    async deleteColor(id: ID): Promise<IColor> {
        return this.colorRepo.softDeleteById(id)
    }
}
