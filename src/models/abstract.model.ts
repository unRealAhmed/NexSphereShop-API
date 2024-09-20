import { Document } from 'mongoose'
import { ID } from '../shared/types'

export abstract class AbstractDocument extends Document {
    declare _id: ID
    createdAt!: Date
    updatedAt!: Date
    deletedAt?: Date | null = null
}
