import { Location, User, UserRole, UserSex, FitnessLevel, WorkoutType, Sportsman, Coach } from '@backend/shared/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user-info.constant';

export class UserInfoEntity implements User {
  public _id?: number;
  public name: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public sex: UserSex;
  public birthDate?: string;
  public role: UserRole;
  public description?: string;
  public sportsmanInfo?: Sportsman | null;
  public coachInfo?: Coach | null;
  public location: Location;
  public photo: string;
  public createdDate: string;
  public fitnessLevel: FitnessLevel;
  public workoutType: WorkoutType[];
  public subscriptions: number[];

  constructor(user: User) {
    this.fillEntity(user);
   }

  public toObject() {
    return {...this };
  }

  public fillEntity(user:User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.sex = user.sex;
    this.birthDate = user.birthDate;
    this.role = user.role;
    this.description = user.description;
    this.sportsmanInfo = user.sportsmanInfo;
    this.coachInfo = user.coachInfo;
    this.location = user.location;
    this.photo = user.photo;
    this.createdDate = user.createdDate;
    this.fitnessLevel = user.fitnessLevel;
    this.workoutType = user.workoutType;
    this.subscriptions = user.subscriptions;
    }

  public async setPassword(password: string): Promise<UserInfoEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
