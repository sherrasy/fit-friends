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
  Body,
  Patch
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyService } from '../notify/notify.service';
import { UserRdo } from './rdo/user.rdo';
import {
  API_TAG_NAME,
  UserInfoError,
  UserInfoMessage,
  UserInfoPath,
} from './user-info.constant';
import { UserInfoService } from './user-info.service';
import { UpdateUserDto } from '@backend/shared/shared-dto';

@ApiTags(API_TAG_NAME)
@Controller(UserInfoPath.Main)
export class UserInfoController {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfoMessage.UserList,
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
    description: UserInfoMessage.UserFound,
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
    description: UserInfoMessage.UserFound,
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


  @ApiResponse({
    status: HttpStatus.OK,
    description:UserInfoMessage.UserUpdated
  })
  @UseGuards(JwtAuthGuard)
  @Patch(UserInfoPath.Update)
  public async updateUser(@Req() { user }: RequestWithUserPayload, @Body() dto:UpdateUserDto) {
    return this.userInfoService.updateUser(user.sub, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserInfoMessage.AvatarAdded
  })
  @UseGuards(JwtAuthGuard)
  @Post(UserInfoPath.UpdateAvatar)
  public async updateAvatar(@Req() { user }: RequestWithUserPayload, @Body('avatarId') avatarId:string) {
    return this.userInfoService.updateAvatar(user.sub, avatarId);
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description:UserInfoMessage.PhotoAdded
  })
  @UseGuards(JwtAuthGuard)
  @Post(UserInfoPath.UpdatePhoto)
  public async updatePhoto(@Req() { user }: RequestWithUserPayload, @Body('photoId') photoId:string) {
    return this.userInfoService.updatePhoto(user.sub, photoId);
  }

}
