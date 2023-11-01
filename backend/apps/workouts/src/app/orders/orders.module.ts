import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutModule } from '../workout/workout.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    WorkoutModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  providers: [OrdersService, OrdersRepository, JwtAccessStrategy],
  controllers: [OrdersController],
})
export class OrdersModule {}
