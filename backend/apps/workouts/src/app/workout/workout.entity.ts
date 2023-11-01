import {
  FitnessLevel,
  UserSex,
  Workout,
  WorkoutTime,
  WorkoutType,
} from '@backend/shared/shared-types';

export class WorkoutEntity implements Workout {
  public id: number;
  public name: string;
  public photo?: string;
  public fitnessLevel: FitnessLevel;
  public workoutType: WorkoutType[];
  public workoutTime: WorkoutTime;
  public price: number;
  public calories: number;
  public description: string;
  public sex: UserSex;
  public video?: string;
  public rating: number;
  public coachId: number;
  public isSpecialOffer: boolean;
  public createdDate: string;
  public amountOrdered: number;
  public priceOrdered: number;

  constructor(workout: Workout) {
    this.fillEntity(workout);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(workout: Workout) {
    this.id = workout.id;
    this.name = workout.name;
    this.photo = workout.photo;
    this.fitnessLevel = workout.fitnessLevel;
    this.workoutType = workout.workoutType;
    this.workoutTime = workout.workoutTime;
    this.price = workout.price;
    this.calories = workout.calories;
    this.description = workout.description;
    this.sex = workout.sex;
    this.video = workout.video;
    this.rating = workout.rating;
    this.coachId = workout.coachId;
    this.isSpecialOffer = workout.isSpecialOffer;
    this.createdDate = workout.createdDate;
    this.priceOrdered = workout.priceOrdered;
    this.amountOrdered = workout.amountOrdered;
  }
}
