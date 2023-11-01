import { UserRoleInterceptor } from '@backend/shared-interceptors';
import { UserQuery } from '@backend/shared-quieries';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyService } from '../notify/notify.service';
import { UserRdo } from './rdo/user.rdo';
import {
  API_TAG_NAME,
  UserInfoError,
  UserInfoMessages,
  UserInfoPath,
} from './user-info.constant';
import { UserInfoService } from './user-info.service';

@ApiTags(API_TAG_NAME)
@Controller(UserInfoPath.Main)
export class UserInfoController {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfoMessages.UserList,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserInfoError.EmptyList,
  })
  @UseInterceptors(UserRoleInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(UserInfoPath.Show)
  public async showList(@Query() query: UserQuery) {
    const users = await this.userInfoService.getUserList(query);
    return users.map((user) => fillObject(UserRdo, user));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfoMessages.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserInfoError.NotFound,
  })
  @UseGuards(JwtAuthGuard)
  @Get(UserInfoPath.Id)
  public async showSingle(@Param('id') id: number) {
    const user = await this.userInfoService.findById(id);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfoMessages.UserFound,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post(`${UserInfoPath.Subscribe}/${UserInfoPath.Id}`)
  public async subscribeOnCoach(
    @Param('id') id: number,
    @Req() { user }: RequestWithUserPayload
  ) {
    const { email } = user;
    await this.userInfoService.checkCoach(id);
    await this.notifyService.updateSubscriber({ email, coach: id });
  }
}
