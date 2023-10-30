import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserInfoModule } from './user-info/user-info.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigUsersModule } from '@backend/config/config-users';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { FriendsModule } from './friends/friends.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthenticationModule,
    UserInfoModule,
    PrismaModule,
    ConfigUsersModule,
    RefreshTokenModule,
    FriendsModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
