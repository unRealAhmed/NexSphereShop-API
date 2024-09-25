import {
    FilterQuery,
    Model,
    PopulateOptions,
    ProjectionType,
    UpdateQuery,
} from 'mongoose'
import { InternalServerError } from '../shared/errors/errors'
import { ID } from '../shared/types'

export abstract class AbstractRepository<TDocument> {
    // eslint-disable-next-line no-unused-vars
    protected constructor(protected readonly model: Model<TDocument>) {}

    create(document: Partial<TDocument>): TDocument {
        try {
            return this.model.create(document) as TDocument
        } catch (error) {
            throw new InternalServerError(
                `Failed to create resource ${this.model.modelName}`,
            )
        }
    }

    findAll<T = TDocument>(options?: {
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

    findOne(filterQuery: FilterQuery<TDocument>): TDocument {
        const document = this.model
            .findOne({ ...filterQuery, deletedAt: null })
            .lean()
            .exec()

        return document as TDocument
    }

    findById(id: ID): TDocument {
        const document = this.model.findById(id).lean().exec()
        return document as TDocument
    }

    updateById(id: ID, update: UpdateQuery<TDocument>): TDocument {
        const document = this.model
            .findByIdAndUpdate(id, update, { new: true, lean: true })
            .exec()
        return document as TDocument
    }

    deleteById(id: ID): TDocument {
        const document = this.model.findByIdAndDelete(id).exec()

        return document as TDocument
    }

    softDeleteById(id: ID): TDocument {
        const document = this.model
            .findByIdAndUpdate(
                id,
                { deletedAt: new Date() },
                { new: true, lean: true },
            )
            .exec()
        return document as TDocument
    }

    softDelete(filterQuery: FilterQuery<TDocument>) {
        const document = this.model.findOneAndUpdate<TDocument>(
            {
                ...filterQuery,
                deletedAt: null,
            },
            {
                deletedAt: new Date(),
            },
        )
        return document as TDocument
    }

    findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ): TDocument {
        const document = this.model
            .findOneAndUpdate(filterQuery, update, { new: true, lean: true })
            .exec()
        return document as TDocument
    }

    findByIdAndUpdate(
        id: ID,
        update: Partial<TDocument>,
        options = { new: true },
    ) {
        return this.model
            .findByIdAndUpdate(id, update, options)
            .exec() as TDocument
    }

    async exists(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
        return !!(await this.model.exists({ ...filterQuery, deletedAt: null }))
    }

    async distinct(
        item: string,
        filter: FilterQuery<TDocument>,
    ): Promise<unknown[]> {
        return this.model.distinct(item, filter)
    }
}
