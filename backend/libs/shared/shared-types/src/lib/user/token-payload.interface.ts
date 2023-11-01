import { UserRole } from '../common/user-role.enum';

export interface TokenPayload {
  sub: number;
  email: string;
  name: string;
  role: UserRole;
}
