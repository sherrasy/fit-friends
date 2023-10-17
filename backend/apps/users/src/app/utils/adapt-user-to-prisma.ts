import { FitnessLevel, WorkoutType } from "@prisma/client";
import { UserInfoEntity } from "../user-info/user-info.entity";

export function adaptUserToPrisma (user:UserInfoEntity){
  if (user) {
    const userInfo = {
      ...user.toObject(),
      password: user.passwordHash,
      workoutType: user.workoutType.map((item)=> item as WorkoutType),
      fitnessLevel: user.fitnessLevel as FitnessLevel,
    };

  delete userInfo.passwordHash;
    return userInfo;

  }
  return null;
}
