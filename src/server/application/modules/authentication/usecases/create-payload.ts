import { User } from '@prisma/client';

export function createPayload(user: User) {
  return {
    email: user.email,
    sub: user.id,
    role: user.role,
  };
}
