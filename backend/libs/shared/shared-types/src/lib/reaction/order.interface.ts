import { PaymentOption } from "./payment-option.enum";

export interface Order {
  _id?: string;
  orderType: string;
  workoutId: string;
  price: number;
  amount: number;
  totalPrice: number;
  paymentOption: PaymentOption;
  userId: string;
}
