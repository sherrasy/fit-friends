import { PaymentOption } from './payment-option.enum';
import { Workout } from './workout.interface';

export interface Order {
  id: number;
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
