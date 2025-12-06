import type { UsersInterface } from '@org/database/schemas'

interface User extends Omit<UsersInterface, 'image'> {}

export type AuthenticatedController = {
  user: User
}
