import { z } from "zod"
import { userSchemas } from "../../validations"

export type CreateUserDTO = z.infer<typeof userSchemas.createUser.body>
// export type FindAllUsersDTO = z.infer<typeof userSchemas.findAllUsers.query>
export type UpdateUserDTO = z.infer<typeof userSchemas.updateUser.body>
export type UpdateCurrentUserDTO = z.infer<typeof userSchemas.updateCurrentUser.body>
export type ChangePasswordDTO = z.infer<typeof userSchemas.updatePassword.body>
export type UpdateShippingAddressDTO = z.infer<typeof userSchemas.updateShippingAddress.body>
export type AssignRoleDTO = z.infer<typeof userSchemas.assignRole.body>
