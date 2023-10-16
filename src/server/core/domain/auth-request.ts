import { Request } from 'express';
import { UserPayload } from '../../../shared/interfaces/user-payload';

export interface AuthRequest extends Request {
  user?: UserPayload;
}
