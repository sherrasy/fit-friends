import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [AuthenticationModule, UserInfoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
