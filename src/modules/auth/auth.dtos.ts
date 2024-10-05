import { z } from "zod"
import { userSchemas } from "../../validations"

export type SignUpBody = z.infer<typeof userSchemas.registration.body>
export type ResetPasswordBody = z.infer<typeof userSchemas.updatePassword.body>
