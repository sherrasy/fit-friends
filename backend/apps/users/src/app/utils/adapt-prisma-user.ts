import {
  FitnessLevel,
  Location,
  PrismaSportsman,
  PrismaUser,
  UserRole,
  UserSex,
  WorkoutTime,
  WorkoutType,
} from '@backend/shared/shared-types';

function adaptPrismaSportsman(sportsman: PrismaSportsman) {
  if (sportsman) {
    const sportsmanInfo = {
      ...sportsman,
      workoutTime: sportsman.workoutTime as WorkoutTime,
    };
    return sportsmanInfo;
  }
  return null;
}

export function adaptPrismaUser(prismaUser: PrismaUser) {
  if (prismaUser) {
    const user = {
      ...prismaUser,
      _id: prismaUser.userId,
      createdDate: prismaUser.createdDate.toISOString(),
      passwordHash: prismaUser.password,
      sex: prismaUser.sex as UserSex,
      role: prismaUser.role as UserRole,
      location: prismaUser.location as Location,
      fitnessLevel: prismaUser.fitnessLevel as FitnessLevel,
      workoutType: prismaUser.workoutType.map((item) => item as WorkoutType),
      sportsmanInfo: adaptPrismaSportsman(prismaUser.sportsmanInfo),
    };

    delete user.userId;
    delete user.password;
    return user;
  }
  return null;
}
