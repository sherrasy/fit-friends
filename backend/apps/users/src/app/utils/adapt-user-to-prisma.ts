import { FitnessLevel, WorkoutType } from '@prisma/users/client';
import { UserInfoEntity } from '../user-info/user-info.entity';

export function adaptUserToPrisma(user: UserInfoEntity) {
  if (user) {
    const userInfo = {
      ...user.toObject(),
      password: user.passwordHash,
      workoutType: user.workoutType.map((item) => item as WorkoutType),
      fitnessLevel: user.fitnessLevel as FitnessLevel,
    };

    delete userInfo._id;
    if(userInfo.sportsmanInfo){
     delete userInfo.sportsmanInfo.sportsmanId;
     delete userInfo.sportsmanInfo.userId;
    }
    if(userInfo.coachInfo){
     delete userInfo.coachInfo.coachId;
     delete userInfo.coachInfo.userId;
    }
    delete userInfo.passwordHash;
    return userInfo;
  }
  return null;
}
