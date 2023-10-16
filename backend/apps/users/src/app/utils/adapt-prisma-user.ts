import { FitnessLevel, Location, PrismaUser, UserRole, UserSex, WorkoutTime, WorkoutType } from "@backend/shared/shared-types"

export function adaptPrismaUser (prismaUser:PrismaUser){
  if (prismaUser) {
    const user = {
      ...prismaUser,
      _id: prismaUser.id,
      createdDate: prismaUser.createdDate.toISOString(),
      passwordHash: prismaUser.password,
      sex: prismaUser.sex as UserSex,
      role: prismaUser.role as UserRole,
      location: prismaUser.location as Location,
      fitnessLevel: prismaUser.fitnessLevel as FitnessLevel,
      workoutType: prismaUser.workoutType.map((item)=> item as WorkoutType ) ,
    };
    if(prismaUser.workoutTime){
    const workoutTime =  Object.entries(WorkoutTime).find(([key,_value])=> key.toLocaleLowerCase() === prismaUser.workoutTime)[1];
    Object.assign(user, {workoutTime});
  }
  delete user.id;
    return user;

  }
  return null;
}
