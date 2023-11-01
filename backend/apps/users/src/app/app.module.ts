import { ConfigUsersModule } from '@backend/config/config-users';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { FriendsModule } from './friends/friends.module';
import { NotifyModule } from './notify/notify.module';
import { PrismaModule } from './prisma/prisma.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserNotificationsModule } from './user-notifications/user-notifications.module';
import { WorkoutRequestModule } from './workout-request/workout-request.module';

@Module({
  imports: [
    AuthenticationModule,
    UserInfoModule,
    PrismaModule,
    ConfigUsersModule,
    RefreshTokenModule,
    FriendsModule,
    NotifyModule,
    WorkoutRequestModule,
    UserNotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
