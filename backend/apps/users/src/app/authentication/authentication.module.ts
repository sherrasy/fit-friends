import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotifyModule } from '../notify/notify.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserInfoModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
