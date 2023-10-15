import { Location, User, UserRole, UserSex } from '@backend/shared/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from '../user-info.constant';

export abstract class UserEntity implements User {
  public id: number;
  public name: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public sex: UserSex;
  public birthDate?: string;
  public role: UserRole;
  public description?: string;
  public location: Location;
  public photo: string;
  public createdDate: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.sex = user.sex;
    this.birthDate = user.birthDate;
    this.role = user.role;
    this.description = user.description;
    this.location = user.location;
    this.photo = user.photo;
    this.createdDate = user.createdDate;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
