import { Location } from "../common/location.enum";
import { UserRole } from "../common/user-role.enum";
import { UserSex } from "../common/user-sex.enum";

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
  createdDate:string;
}
