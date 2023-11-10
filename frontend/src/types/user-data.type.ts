import { UserRole } from './user-role.enum';

export type UserData = {
  id: string;
  userName: string;
  email: string;
  role: UserRole;
  token: string;
}
