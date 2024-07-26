import { datatype, image, internet, lorem, name, random } from 'faker';
import { FitnessLevel } from '@frontend-types/common/fitness-level.enum';
import { Location } from '@frontend-types/common/location.enum';
import { PaymentOption } from '@frontend-types/common/payment-option.enum';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { UserSex } from '@frontend-types/common/user-sex.enum';
import { WorkoutTime } from '@frontend-types/common/workout-time.enum';
import { WorkoutType } from '@frontend-types/common/workout-type.enum';
import { Order, OrderCoach } from '@frontend-types/reaction/order.interface';
import { Review } from '@frontend-types/reaction/review.interface';
import { UserNotification } from '@frontend-types/reaction/user-notification.interface';
import { NewUserGeneral, User } from '@frontend-types/user/user.interface';
import { Workout } from '@frontend-types/workout/workout.interface';
import { CardsLimit, DefaultParam } from './constant';
import {
  CaloriesAmount,
  DescriptionLength,
  RaitingCount,
  ReviewTextLength,
} from './validation.constant';
import { Certificate } from '@frontend-types/reaction/file.interface';

const genders = Object.values(UserSex);
const locations = Object.values(Location);
const fitnessLevels = Object.values(FitnessLevel);
const workoutTypes = Object.values(WorkoutType);
const workoutTimes = Object.values(WorkoutTime);
const paymentOptions = Object.values(PaymentOption);
const mockDate = '1990-01-01T00:00:00.000Z';
const orderType = 'абонемент';

export const makeFakeUser = (): User => {
  const userId = datatype.number();
  return {
    id: userId,
    name: name.firstName(),
    email: internet.email(),
    avatar: datatype.uuid(),
    avatarPath: image.avatar(),
    sex: random.arrayElement(genders),
    birthDate: mockDate,
    role: UserRole.Sportsman,
    description: lorem.words(DescriptionLength.Min),
    location: random.arrayElement(locations),
    photo: datatype.uuid(),
    createdDate: datatype.datetime().toISOString(),
    fitnessLevel: random.arrayElement(fitnessLevels),
    workoutType: random.arrayElements(workoutTypes),
    sportsmanInfo: {
      sportsmanId: datatype.number(),
      userId,
      workoutTime: random.arrayElement(workoutTimes),
      caloriesTotal: datatype.number({
        min: CaloriesAmount.Min,
        max: CaloriesAmount.Max,
      }),
      caloriesPerDay: datatype.number({
        min: CaloriesAmount.Min,
        max: CaloriesAmount.Max,
      }),
      isReady: datatype.boolean(),
    },
    coachInfo: null,
    token:lorem.sentence(DefaultParam.Step)
  } as User;
};

export const makeFakeCoach = (): User => {
  const userId = datatype.number();
  return {
    id: userId,
    name: name.firstName(),
    email: internet.email(),
    avatar: datatype.uuid(),
    avatarPath: image.avatar(),
    sex: random.arrayElement(genders),
    birthDate: mockDate,
    role: UserRole.Coach,
    description: lorem.words(DescriptionLength.Min),
    location: random.arrayElement(locations),
    photo: datatype.uuid(),
    createdDate: datatype.datetime().toISOString(),
    fitnessLevel: random.arrayElement(fitnessLevels),
    workoutType: random.arrayElements(workoutTypes),
    sportsmanInfo: null,
    coachInfo: {
      coachId: datatype.number(),
      userId,
      certificate: datatype.uuid(),
      successInfo: lorem.words(DescriptionLength.Min),
      isPersonal: datatype.boolean(),
    },
    token:lorem.sentence(DefaultParam.Step)
  } as User;
};

export const makeFakeWorkout = (): Workout => {
  const price = datatype.number();
  const amount = datatype.number();
  return {
    id: datatype.number(),
    name: name.title(),
    photo: datatype.uuid(),
    fitnessLevel: random.arrayElement(fitnessLevels),
    workoutType: random.arrayElements(workoutTypes),
    workoutTime: random.arrayElement(workoutTimes),
    price,
    calories: datatype.number({
      min: CaloriesAmount.Min,
      max: CaloriesAmount.Max,
    }),
    description: lorem.words(DescriptionLength.Min),
    sex: random.arrayElement(genders),
    video: datatype.uuid(),
    videoPath: image.imageUrl(),
    rating: datatype.number({ min: RaitingCount.Min, max: RaitingCount.Max }),
    coachId: datatype.number(),
    isSpecialOffer: datatype.boolean(),
    createdDate: datatype.datetime().toISOString(),
    amountOrdered: amount,
    priceOrdered: amount * price,
    specialPrice: price,
  } as Workout;
};

export const makeFakeNewUserGeneral = (): NewUserGeneral =>
  ({
    name: name.firstName(),
    email: internet.email(),
    avatar: datatype.uuid(),
    password: internet.password(),
    sex: random.arrayElement(genders),
    birthDate: mockDate,
    role:UserRole.Sportsman,
    location: random.arrayElement(locations),
  } as NewUserGeneral);

export const makeFakeOrder = (): Order => {
  const workout = makeFakeWorkout();
  const amount = datatype.number();
  const amountDone = datatype.number({ min: DefaultParam.Amount, max: amount });
  return {
    orderId: datatype.number(),
    createdDate: datatype.datetime().toISOString(),
    orderType,
    workoutId: workout.id,
    price: workout.price,
    totalPrice: workout.price * amount,
    amount,
    amountDone,
    paymentOption: random.arrayElement(paymentOptions),
    userId: datatype.number(),
    workout,
  } as Order;
};

export const makeFakeOrderCoach = (): OrderCoach => {
  const amount = datatype.number();
  const price = datatype.number();
  return {
    id: datatype.number(),
    coachId: datatype.number(),
    name: name.title(),
    fitnessLevel: random.arrayElement(fitnessLevels),
    workoutType: random.arrayElements(workoutTypes),
    workoutTime: random.arrayElement(workoutTimes),
    price: datatype.number(),
    calories: datatype.number({
      min: CaloriesAmount.Min,
      max: CaloriesAmount.Max,
    }),
    description: lorem.words(DescriptionLength.Min),
    photo: datatype.uuid(),
    video: datatype.uuid(),
    rating: datatype.number({ min: RaitingCount.Min, max: RaitingCount.Max }),
    sex: random.arrayElement(genders),
    isSpecialOffer: datatype.boolean(),
    priceOrdered: price * amount,
    amountOrdered: amount,
  } as OrderCoach;
};

export const makeFakeUserNotification = (): UserNotification =>
  ({
    id: datatype.number(),
    userId: datatype.number(),
    createdDate: datatype.datetime(),
    text: lorem.words(DescriptionLength.Min),
  } as UserNotification);

export const makeFakeReview = (): Review =>
  ({
    id: datatype.number(),
    userId: datatype.number(),
    name: name.firstName(),
    avatarPath: image.avatar(),
    workoutId: datatype.number(),
    rating: datatype.number({ min: RaitingCount.Min, max: RaitingCount.Max }),
    message: lorem.words(ReviewTextLength.Min),
    createdDate: datatype.datetime(),
  } as Review);

export const makeFakeCertificate = (): Certificate =>
  ({
    id: datatype.uuid(),
    path: image.imageUrl(),
  } as Certificate);

export const makeFakeWorkouts = (): Workout[] =>
  Array.from({ length: CardsLimit.Default }, () => makeFakeWorkout());

export const makeFakeReviews = (): Review[] =>
  Array.from({ length: CardsLimit.Default }, () => makeFakeReview());

export const makeFakeUsers = (): User[] =>
  Array.from({ length: CardsLimit.Default }, () => makeFakeUser());

export const makeFakeOrders = (): Order[] =>
  Array.from({ length: CardsLimit.Default }, () => makeFakeOrder());

export const makeFakeCoachOrders = (): OrderCoach[] =>
  Array.from({ length: CardsLimit.CoachOrders }, () => makeFakeOrderCoach());

export const makeFakeNotifications = (): UserNotification[] =>
  Array.from({ length: CardsLimit.CoachOrders }, () =>
    makeFakeUserNotification()
  );

export const makeFakeCertificates = (): Certificate[] =>
  Array.from({ length: CardsLimit.Default }, () => makeFakeCertificate());
