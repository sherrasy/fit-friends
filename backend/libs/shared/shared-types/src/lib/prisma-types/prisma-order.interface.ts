import { PrismaWorkout } from "./prisma-workout.interface";

export interface PrismaOrder  {
  id: number;
  userId: number;
  orderType: string;
  workoutId: number;
  price: number;
  amount: number;
  amountDone: number;
  paymentOption: string;
  createdDate: Date;
  workout?:PrismaWorkout;
}
