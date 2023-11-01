import { PaymentOption, PrismaOrder } from '@backend/shared/shared-types';
import { adaptPrismaWorkout } from './adapt-prisma-workout';


export function adaptPrismaOrder(prismaOrder: PrismaOrder) {
  if (prismaOrder) {
    const order = {
      ...prismaOrder,
      paymentOption: prismaOrder.paymentOption as PaymentOption,
      createdDate: prismaOrder.createdDate.toISOString(),
      totalPrice: (prismaOrder.amount + prismaOrder.amountDone) * prismaOrder.price,
      workout: adaptPrismaWorkout(prismaOrder.workout),
    };
    if(order.workout){
    delete order.workout.amountOrdered;
    delete order.workout.priceOrdered;
    delete order.workout.createdDate;
    delete order.workout.updatedDate;
  }
    return order;
  }
  return null;
}
