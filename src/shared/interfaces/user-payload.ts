import { UserRole } from '@prisma/client';

export interface UserPayload {
  email: string;
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}
