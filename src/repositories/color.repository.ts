import Color, { IColor } from '../models/color.model'
import { AbstractRepository } from './abstract.repository'

export class ColorRepository extends AbstractRepository<IColor> {
    constructor() {
        super(Color)
    }
}
