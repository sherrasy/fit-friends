import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpCLientParam } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UploaderController } from './controllers/uploader.controller';
import { WorkoutsController } from './controllers/workouts.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout:HttpCLientParam.Timeout,
      maxRedirects:HttpCLientParam.MaxRedirects
    })
  ],
  controllers: [
    UsersController,
    UploaderController,
    WorkoutsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
