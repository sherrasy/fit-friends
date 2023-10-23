import { PrismaFitnessLevel, PrismaUserSex, PrismaWorkoutType } from "./prisma-types";

export interface PrismaWorkout{
  workoutId: number;
  coachId: number;
  name: string;
  sex: PrismaUserSex;
  photo: string | null;
  video: string | null;
  price: number;
  calories: number;
  rating: number;
  isSpecialOffer: boolean;
  description: string | null;
  createdDate: Date;
  updatedDate: Date;
  workoutTime: string;
  workoutType: PrismaWorkoutType[];
  fitnessLevel: PrismaFitnessLevel;
}
