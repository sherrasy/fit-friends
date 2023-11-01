import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CheckJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    _err: any,
    userToken: any,
    _info: any,
    context: ExecutionContext
  ) {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      request.body['accessToken'] =
        request.headers['authorization'].split(' ')[1];
      request.body['refreshToken'] =
        request.headers['authorization'].split(' ')[2];
      request.body['userId'] = userToken.sub;
    }
    return userToken;
  }
}
