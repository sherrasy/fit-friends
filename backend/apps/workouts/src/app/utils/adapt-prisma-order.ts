import { PaymentOption, PrismaOrder } from "@backend/shared/shared-types";

export function adaptPrismaOrder (prismaOrder:PrismaOrder){
  if (prismaOrder) {
    const order = {
      ...prismaOrder,
      paymentOption: prismaOrder.paymentOption as PaymentOption,
      createdDate: prismaOrder.createdDate.toISOString(),
    };
    return order;
  }
  return null;
}
