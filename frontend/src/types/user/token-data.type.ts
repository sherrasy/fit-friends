import { UserRole } from '../common/user-role.enum';

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type TokenPayloadData = {
  sub: number;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
};

