import { UserRole } from "../common/user-role.enum";
import { UserSex } from "../common/user-sex.enum";
import { Location } from "./location.enum";

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  sex: UserSex;
  birthDate?: string;
  role: UserRole;
  description?: string;
  location: Location;
  photo?: string;
}
