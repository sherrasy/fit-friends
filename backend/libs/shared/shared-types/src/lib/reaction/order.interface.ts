import { PaymentOption } from '../common/payment-option.enum';

export interface Order {
  id?: number;
  createdDate?: string;
  orderType: string;
  workoutId: number;
  price: number;
  totalPrice?: number;
  amount: number;
  amountDone: number;
  paymentOption: PaymentOption;
  userId?: number;
}
