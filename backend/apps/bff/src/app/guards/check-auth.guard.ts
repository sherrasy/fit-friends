import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AppPath } from '../app.constant';
import { bffConfig } from '@backend/config-bff';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(bffConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof bffConfig>
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${this.serviceConfig.users}${ApplicationServiceURL.Users}/${AppPath.Check}`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
