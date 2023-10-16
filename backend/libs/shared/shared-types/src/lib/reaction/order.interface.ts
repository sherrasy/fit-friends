import { PaymentOption } from "../common/payment-option.enum";

export interface Order {
  id?: string;
  orderType: string;
  workoutId: string;
  price: number;
  amount: number;
  totalPrice: number;
  paymentOption: PaymentOption;
  userId: string;
}
