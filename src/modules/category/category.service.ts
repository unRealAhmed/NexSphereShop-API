import { ICategory } from '../../models'
import { CategoryRepository } from '../../repositories'
import { ConflictError } from '../../shared/errors/errors'
import { ID } from '../../shared/types'

export class CategoryService {
    private readonly categoryRepository: CategoryRepository
    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    async createCategory(
        name: string,
        userId: ID,
        imagePath?: string,
    ): Promise<ICategory> {
        const categoryExists = await this.categoryRepository.exists({ name })
        if (categoryExists) {
            throw new ConflictError('Category already exists')
        }

        return this.categoryRepository.create({
            name: name.toLowerCase(),
            user: userId,
            image: imagePath,
        })
    }

    async getCategoryByName(name: string): Promise<ICategory> {
        return this.categoryRepository.findOne({ name })
    }

    async updateCategory(id: ID, name: string): Promise<ICategory> {
        return this.categoryRepository.updateById(id, { name })
    }

    async getAllCategories(): Promise<ICategory[]> {
        return this.categoryRepository.findAll()
    }

    async deleteCategory(id: ID): Promise<ICategory> {
        return this.categoryRepository.deleteById(id)
    }
}
