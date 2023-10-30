import { PrismaFitnessLevel, PrismaLocation, PrismaUserRole, PrismaUserSex, PrismaWorkoutType } from "./prisma-types";

export type PrismaSportsman = {
  sportsmanId: number;
  userId: number;
  workoutTime: string;
  caloriesTotal: number;
  caloriesPerDay: number;
  isReady: boolean;
};

export type PrismaCoach = {
  coachId: number;
  userId: number;
  successInfo: string | null;
  certificate: string | null;
  isPersonal: boolean | null;
};

export interface PrismaUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  sex: PrismaUserSex;
  role: PrismaUserRole;
  location: PrismaLocation;
  fitnessLevel: PrismaFitnessLevel;
  workoutType: PrismaWorkoutType[];
  description: string;
  birthDate: string;
  createdDate: Date;
  updatedDate: Date;
  avatar: string;
  photo: string;
  sportsmanInfo?: PrismaSportsman | null;
  coachInfo?: PrismaCoach | null;
  subscriptions:number[]
}
