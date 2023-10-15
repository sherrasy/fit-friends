// import { Module } from '@nestjs/common';
// import { AuthenticationController } from './authentication.controller';
// // import { AuthenticationService } from './authentication.service';
// import { JwtAccessStrategy, getJwtOptions } from '@backend/util-core';
// import { LocalStrategy } from './strategies/local.strategy';
// import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     JwtModule.registerAsync({
//     imports: [],
//     inject: [ConfigService],
//     useFactory: getJwtOptions,
//   }),],
//   controllers: [AuthenticationController],
//   providers: [
//     // AuthenticationService,
//     JwtAccessStrategy,
//     LocalStrategy,
//     JwtRefreshStrategy,],
// })
// export class AuthenticationModule {}
