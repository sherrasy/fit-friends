import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class IsAuthorizedInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      request.body['accessToken'] =
        request.headers['authorization'].split(' ')[1];
      request.body['refreshToken'] =
        request.headers['authorization'].split(' ')[2];
      request.body['userId'] = request.user.sub;
    }
    return next.handle();
  }
}
