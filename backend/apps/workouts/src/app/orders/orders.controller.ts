import {
  CoachRoleInterceptor,
  UserRoleInterceptor,
} from '@backend/shared-interceptors';
import { CoachOrderQuery } from '@backend/shared-quieries';
import {
  CreateOrderDto,
  UpdateOrderAmountDto,
} from '@backend/shared/shared-dto';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutFullRdo } from '../workout/rdo/workout-full.rdo';
import {
  API_TAG_NAME,
  OrdersError,
  OrdersMessages,
  OrdersPath,
} from './orders.constant';
import { OrdersService } from './orders.service';
import { OrderRdo } from './rdo/order.rdo';

@ApiTags(API_TAG_NAME)
@Controller(OrdersPath.Main)
export class OrdersController {
  constructor(private readonly workoutsOrderService: OrdersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: OrdersMessages.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: OrdersError.EmptyOrders,
  })
  @UseGuards(JwtAuthGuard)
  @Get(OrdersPath.CoachOrders)
  @UseInterceptors(CoachRoleInterceptor)
  public async showByCoach(
    @Req() { user }: RequestWithUserPayload,
    @Query() query: CoachOrderQuery
  ) {
    const coachId = user.sub;
    const orders = await this.workoutsOrderService.findByCoachId(
      coachId,
      query
    );
    return orders.map((order) => fillObject(WorkoutFullRdo, order));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: OrdersMessages.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: OrdersError.EmptyOrders,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(UserRoleInterceptor)
  public async showByUser(@Req() { user }: RequestWithUserPayload) {
    const userId = user.sub;
    const orders = await this.workoutsOrderService.findByUserId(userId);
    return orders.map((order) => fillObject(OrderRdo, order));
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: OrdersMessages.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(UserRoleInterceptor)
  public async create(
    @Req() { user }: RequestWithUserPayload,
    @Body() dto: CreateOrderDto
  ) {
    const userId = user.sub;
    const workout = await this.workoutsOrderService.create(dto, userId);
    return fillObject(OrderRdo, workout);
  }

  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(UserRoleInterceptor)
  public async update(
    @Req() { user }: RequestWithUserPayload,
    @Body() dto: UpdateOrderAmountDto
  ) {
    const userId = user.sub;
    const workout = await this.workoutsOrderService.update(dto, userId);
    return fillObject(OrderRdo, workout);
  }
}
