import { ICategory } from '../../models'
import { CategoryRepository } from '../../repositories'
import { ErrorMessages } from '../../shared/constants/errorMessages'
import { BadRequestError, NotFoundError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dtos'

export class CategoryService {
    private readonly categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    async createCategory(
        data: CreateCategoryDTO,
        userId: ID,
    ): Promise<ICategory> {
        const existingCategory = await this.categoryRepository.findOne({
            name: data.name,
        })
        if (existingCategory) {
            throw new BadRequestError(ErrorMessages.CATEGORY_ALREADY_EXISTS)
        }

        return this.categoryRepository.create({ ...data, createdBy: userId })
    }

    async getAllCategories(): Promise<ICategory[]> {
        return this.categoryRepository.findAll({})
    }

    async getCategory(categoryId: ID): Promise<ICategory> {
        const category = await this.categoryRepository.findById(categoryId)
        if (!category) {
            throw new NotFoundError(ErrorMessages.CATEGORY_NOT_FOUND)
        }

        return category
    }

    async updateCategory(
        categoryId: ID,
        data: UpdateCategoryDTO,
    ): Promise<ICategory> {
        const categoryExist = await this.categoryRepository.findById(categoryId)
        if (!categoryExist) {
            throw new NotFoundError(ErrorMessages.CATEGORY_NOT_FOUND)
        }

        return this.categoryRepository.updateById(categoryId, data)
    }

    async deleteCategory(categoryId: ID): Promise<void> {
        const category = await this.categoryRepository.findById(categoryId)
        if (!category) {
            throw new NotFoundError(ErrorMessages.CATEGORY_NOT_FOUND)
        }

        await this.categoryRepository.softDelete(categoryId)
    }
}
