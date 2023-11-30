import { FitnessLevel } from '../common/fitness-level.enum';
import { PaymentOption } from '../common/payment-option.enum';
import { UserSex } from '../common/user-sex.enum';
import { WorkoutTime } from '../common/workout-time.enum';
import { WorkoutType } from '../common/workout-type.enum';
import { Workout } from '../workout/workout.interface';

export interface Order {
  orderId: number;
  createdDate: string;
  orderType: string;
  workoutId: number;
  price: number;
  totalPrice: number;
  amount: number;
  amountDone: number;
  paymentOption: PaymentOption;
  userId: number;
  workout: Workout;
}

export interface OrderCoach {
  id: number;
  coachId: number;
  name: string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  workoutTime: WorkoutTime;
  price: number;
  calories: number;
  description: string;
  photo?: string;
  video?: string;
  rating: number;
  sex: UserSex;
  isSpecialOffer: boolean;
  priceOrdered: number;
  amountOrdered: number;
}

export interface OrderCoachData {
  orders: OrderCoach[];
  ordersAmount: number;
}
