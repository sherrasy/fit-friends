import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserInfoModule } from './user-info/user-info.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigUsersModule } from '@backend/config/config-users';

@Module({
  imports: [
     AuthenticationModule,
     UserInfoModule,
     PrismaModule,
     ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
