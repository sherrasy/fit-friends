import { WorkoutTime } from '@frontend-types/common/workout-time.enum';
import { DefaultParam } from '@utils/constant';
import {
  makeFakeNewUserGeneral,
  makeFakeUser,
  makeFakeUsers,
} from '@utils/mocks';
import { CaloriesAmount } from '@utils/validation.constant';

export const fakeUser = makeFakeUser();
export const fakeSportsmanInfo = {
  workoutType: fakeUser.workoutType,
  fitnessLevel: fakeUser.fitnessLevel,
  sportsmanInfo: {
    workoutTime: WorkoutTime.Basic,
    caloriesTotal: CaloriesAmount.Min,
    caloriesPerDay: CaloriesAmount.Min,
    isReady: DefaultParam.Status,
  },
};
export const fakeUserGeneral = makeFakeNewUserGeneral();
export const fakeUsers = makeFakeUsers();
