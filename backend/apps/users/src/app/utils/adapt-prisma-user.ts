import { FitnessLevel, Location, PrismaUser, UserRole, UserSex, WorkoutTime, WorkoutType } from "@backend/shared/shared-types"

export function adaptPrismaUser (prismaUser:PrismaUser){
  if (prismaUser) {
    const user = {
      ...prismaUser,
      createdDate: prismaUser.createdDate.toISOString(),
      passwordHash: prismaUser.password,
      sex: prismaUser.sex as UserSex,
      role: prismaUser.role as UserRole,
      location: prismaUser.location as Location,
      fitnessLevel: prismaUser.fitnessLevel as FitnessLevel,
      workoutTime: prismaUser.workoutTime as WorkoutTime,
      workoutType: prismaUser.workoutType.map((item)=> item as WorkoutType ) ,
    };
    return user;
  }
  return null;
}
