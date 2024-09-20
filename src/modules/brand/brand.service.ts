import { IBrand } from '../../models'
import { BrandRepository } from '../../repositories'
import { ConflictError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'

export class BrandService {
    private readonly brandRepository: BrandRepository
    constructor() {
        this.brandRepository = new BrandRepository()
    }

    async createBrand(name: string, userId: ID): Promise<IBrand> {
        const brandExists = await this.brandRepository.exists({ name })
        if (brandExists) {
            throw new ConflictError('Brand already exists')
        }
        // Create the brand
        return this.brandRepository.create({
            name: name.toLowerCase(),
            user: userId,
        })
    }

    async getBrandByName(name: string): Promise<IBrand> {
        return this.brandRepository.findOne({ name })
    }

    async updateBrand(id: ID, name: string): Promise<IBrand> {
        return this.brandRepository.updateById(id, { name })
    }

    async getAllBrands(): Promise<IBrand[]> {
        return this.brandRepository.findAll()
    }

    async deleteBrand(id: ID): Promise<IBrand> {
        return await this.brandRepository.deleteById(id)
    }
}
