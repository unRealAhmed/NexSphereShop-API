import {
    FilterQuery,
    Model,
    PopulateOptions,
    ProjectionType,
    UpdateQuery,
} from 'mongoose'
import { InternalServerError, NotFoundError } from '../shared/errors/errors'
import { ID } from '../shared/types'

export abstract class AbstractRepository<TDocument> {
    protected constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Partial<TDocument>): Promise<TDocument> {
        try {
            return this.model.create(document)
        } catch (error) {
            throw new InternalServerError(
                `Failed to create resource ${this.model.modelName}`,
            )
        }
    }

    async findAll<T = TDocument>(options?: {
        filter?: FilterQuery<TDocument>
        select?: ProjectionType<TDocument>
        skip?: number
        take?: number
        sort?: string
        sortDirection?: -1 | 1
        populate?: PopulateOptions | PopulateOptions[]
    }): Promise<T[]> {
        const filter = {
            ...options?.filter,
            deletedAt: null,
        }

        const select = {
            deletedAt: 0,
            __v: 0,
            ...(options?.select as Record<string, unknown>),
        }

        let query = this.model.find<T>(filter, select)

        if (Array.isArray(options?.populate)) {
            options.populate.forEach(populateOption => {
                query = query.populate(populateOption)
            })
        } else if (options?.populate) {
            query = query.populate(options.populate)
        }

        const skip = options?.skip ?? 0
        const limit = options?.take ?? 10

        query = query.skip(skip).limit(limit)

        return query
            .sort({
                [options?.sort ?? 'createdAt']: options?.sortDirection ?? -1,
            })
            .lean()
            .exec() as unknown as Promise<T[]>
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model
            .findOne({ ...filterQuery, deletedAt: null })
            .lean()
            .exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with the given filter: ${JSON.stringify(filterQuery)}`,
            )
        }
        return document as unknown as TDocument
    }

    async findById(id: ID): Promise<TDocument> {
        const document = await this.model.findById(id).lean().exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with id: ${id}`,
            )
        }
        return document as unknown as TDocument
    }

    async updateById(
        id: ID,
        update: UpdateQuery<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model
            .findByIdAndUpdate(id, update, { new: true, lean: true })
            .exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with id: ${id}`,
            )
        }
        return document as unknown as TDocument
    }

    async deleteById(id: ID): Promise<TDocument> {
        const document = await this.model.findByIdAndDelete(id).exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with id: ${id}`,
            )
        }
        return document
    }

    async softDeleteById(id: ID): Promise<TDocument> {
        const document = await this.model
            .findByIdAndUpdate(
                id,
                { deletedAt: new Date() },
                { new: true, lean: true },
            )
            .exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with id: ${id}`,
            )
        }
        return document as unknown as TDocument
    }

    async softDelete(filterQuery: FilterQuery<TDocument>) {
        const document = await this.model.findOneAndUpdate<TDocument>(
            {
                ...filterQuery,
                deletedAt: null,
            },
            {
                deletedAt: new Date(),
            },
        )

        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} Document not found.`,
            )
        }

        return document as unknown as TDocument
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model
            .findOneAndUpdate(filterQuery, update, { new: true, lean: true })
            .exec()
        if (!document) {
            throw new NotFoundError(
                `${this.model.modelName} not found with the given filter: ${JSON.stringify(filterQuery)}`,
            )
        }
        return document as unknown as TDocument
    }

    public async findByIdAndUpdate(
        id: ID,
        update: Partial<TDocument>,
        options = { new: true },
    ) {
        return this.model.findByIdAndUpdate(id, update, options).exec()
    }

    async exists(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
        return !!(await this.model.exists({ ...filterQuery, deletedAt: null }))
    }

    async distinct(
        item: string,
        filter: FilterQuery<TDocument>,
    ): Promise<any[]> {
        return this.model.distinct(item, filter)
    }
}
