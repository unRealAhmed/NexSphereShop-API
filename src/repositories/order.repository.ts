import Order, { IOrder } from '../models/order.model'
import { AbstractRepository } from './abstract.repository'

export class OrderRepository extends AbstractRepository<IOrder> {
    constructor() {
        super(Order)
    }
}
