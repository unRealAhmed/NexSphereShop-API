export const ProductStatusEnum = {
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
} as const

export type ProductStatusType =
    (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum]

export const ProductStatusValues = Object.values(ProductStatusEnum)
