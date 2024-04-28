import { IBrand } from '../../models'
import { BrandRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { CreateBrandDTO, UpdateBrandDTO } from './brand.dtos'

export class BrandService {
    private readonly brandRepository: BrandRepository

    constructor() {
        this.brandRepository = new BrandRepository()
    }

    async createBrand(data: CreateBrandDTO, userId: ID): Promise<IBrand> {
        const existingBrand = await this.brandRepository.findOne({
            name: data.name,
        })
        if (existingBrand) {
            throw new BadRequestError(ErrorMessages.BRAND_ALREADY_EXISTS)
        }

        return this.brandRepository.create({ ...data, createdBy: userId })
    }

    async getAllBrands(): Promise<IBrand[]> {
        return this.brandRepository.findAll({})
    }

    async getBrand(brandId: ID): Promise<IBrand> {
        const brand = await this.brandRepository.findById(brandId)
        if (!brand) {
            throw new NotFoundError(ErrorMessages.BRAND_NOT_FOUND)
        }

        return brand
    }

    async updateBrand(brandId: ID, data: UpdateBrandDTO): Promise<IBrand> {
        const brandExist = await this.brandRepository.findById(brandId)
        if (!brandExist) {
            throw new NotFoundError(ErrorMessages.BRAND_NOT_FOUND)
        }

        return this.brandRepository.updateById(brandId, data)
    }

    async deleteBrand(brandId: ID): Promise<void> {
        const brand = await this.brandRepository.findById(brandId)
        if (!brand) {
            throw new NotFoundError(ErrorMessages.BRAND_NOT_FOUND)
        }

        await this.brandRepository.softDelete(brandId)
    }
}
