import { Order, PaymentOption } from '@backend/shared/shared-types';
import { Entity } from '@backend/util/util-types';

export class OrderEntity implements Order, Entity<OrderEntity> {
  public id: number;
  public userId: number;
  public createdDate: string;
  public orderType: string;
  public workoutId: number;
  public price: number;
  public amount: number;
  public paymentOption: PaymentOption;

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(order: Order) {
    this.id = order.id;
    this.userId = order.userId;
    this.createdDate = order.createdDate;
    this.orderType = order.orderType;
    this.workoutId = order.workoutId;
    this.price = order.price;
    this.amount = order.amount;
    this.paymentOption = order.paymentOption;
  }

}
