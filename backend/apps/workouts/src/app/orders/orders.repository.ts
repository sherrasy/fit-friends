import { CoachOrderQuery } from '@backend/shared-quieries';
import { Order, Workout } from '@backend/shared/shared-types';
import { DefaultParam } from '@backend/util/util-core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaOrder } from '../utils/adapt-prisma-order';
import { adaptPrismaWorkout } from '../utils/adapt-prisma-workout';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderEntity): Promise<Order> {
    const data = {
      ...item.toObject(),
      paymentOption: item.paymentOption as string,
      amountDone: DefaultParam.Amount
    };
    const order = await this.prisma.workoutOrder.create({
      data,
      include: {
        workout: true,
      },
    });

    await this.prisma.workout.update({
      where: { workoutId: item.workoutId },
      data: {
        amountOrdered: { increment: item.amount },
        priceOrdered: { increment: item.price * item.amount },
      },
    });

    return adaptPrismaOrder(order);
  }

  public async findById(id: number): Promise<Order> {
    const order = await this.prisma.workoutOrder.findFirst({
      where: {
        id,
      },
    });
    return adaptPrismaOrder(order);
  }

  public async findByUserId(userId: number): Promise<Order[] | null> {
    const orders = await this.prisma.workoutOrder.findMany({
      where: {
        userId,
      },
      include: {
        workout: true,
      },
    });
    return orders.map((order) => adaptPrismaOrder(order));
  }

  public async findByCoach(
    coachId: number,
    { limit, page, sortDirection, sortBy }: CoachOrderQuery
  ): Promise<Workout[] | null> {
    const queryParams = {
      where: {
        AND: {
          coachId,
          amountOrdered: { gt: DefaultParam.Amount },
        },
      },
      take: limit,
      orderBy: [{ [sortBy]: sortDirection }],
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
    };
    const workouts = await this.prisma.workout.findMany(queryParams);
    return workouts.map((workout) => adaptPrismaWorkout(workout));
  }

  public async increaseAmout(id: number, price: number): Promise<Order> {
    const order = await this.prisma.workoutOrder.update({
      where: { id },
      data: {
        amount: { increment: DefaultParam.Step },
      },
      include: {
        workout: true,
      },
    });
    await this.prisma.workout.update({
      where: { workoutId: id },
      data: {
        amountOrdered: { increment: DefaultParam.Step },
        priceOrdered: { increment: price },
      },
    });
    return adaptPrismaOrder(order);
  }
  public async decreaseAmout(id: number): Promise<Order> {
    const order = await this.prisma.workoutOrder.update({
      where: { id },
      data: {
        amount: { decrement: DefaultParam.Step },
        amountDone: { increment: DefaultParam.Step },
      },
      include: {
        workout: true,
      },
    });
    return adaptPrismaOrder(order);
  }
}
