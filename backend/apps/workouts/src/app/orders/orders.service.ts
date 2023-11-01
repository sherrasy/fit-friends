import { DefaultParam, getDate } from '@backend/util/util-core';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderEntity } from './order.entity';
import { CreateOrderDto, UpdateOrderAmountDto } from '@backend/shared/shared-dto';
import { OrdersError } from './orders.constant';
import { AmountUpdateType, Workout } from '@backend/shared/shared-types';
import { CoachOrderQuery } from '@backend/shared-quieries';
import { WorkoutRepository } from '../workout/workout.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly workoutsOrderRepository: OrdersRepository,
    private readonly workoutRepository: WorkoutRepository
  ) {}

  public async create(dto: CreateOrderDto, userId: number) {
    const workout = await this.workoutRepository.findById(dto.workoutId)
    if (!workout) {
      throw new BadRequestException(OrdersError.WrongWorkout);
    }
    const order = {
      ...dto,
      userId,
      createdDate: getDate(),
      price:workout.price,
      amountDone:DefaultParam.Amount
    };
    const orderEntity = new OrderEntity(order);

    return this.workoutsOrderRepository.create(orderEntity);
  }

  public async update(dto:UpdateOrderAmountDto, userId:number) {
    const {orderId, updateType} = dto
    const order = await this.workoutsOrderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException(OrdersError.OrderNotFound);
    }
    if(userId !== order.userId){
      throw new BadRequestException(OrdersError.WrongUser);
    }
    return updateType === AmountUpdateType.Increase
      ? await this.workoutsOrderRepository.increaseAmout(orderId, order.price)
      : await this.workoutsOrderRepository.decreaseAmout(orderId);
  }

  public async findByUserId(userId: number) {
    const orders = await this.workoutsOrderRepository.findByUserId(userId);
    if (!orders) {
      throw new NotFoundException(OrdersError.EmptyOrders);
    }
    return orders;
  }

  public async findByCoachId(coachId:number, query:CoachOrderQuery): Promise<Workout[]> {
    return this.workoutsOrderRepository.findByCoach(coachId, query);
  }

}
