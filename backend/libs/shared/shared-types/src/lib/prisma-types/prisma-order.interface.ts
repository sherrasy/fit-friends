export interface PrismaOrder  {
  id: number;
  userId: number;
  orderType: string;
  workoutId: number;
  price: number;
  amount: number;
  paymentOption: string;
  createdDate: Date;
}
