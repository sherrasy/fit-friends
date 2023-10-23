import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@backend/shared/shared-types';


@Injectable()
export class CoachRoleInterceptor implements NestInterceptor {

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.user.role !== UserRole.Coach) {
      throw new ConflictException('Этот запрос могут направить только авторизованные пользователи с ролью «Тренер»')
    }
    return next.handle();
  }
}
