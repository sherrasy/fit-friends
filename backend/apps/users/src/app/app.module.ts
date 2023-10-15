import { Module } from '@nestjs/common';
// import { AuthenticationModule } from './authentication/authentication.module';
import { UserInfoModule } from './user-info/user-info.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // AuthenticationModule,
     UserInfoModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
