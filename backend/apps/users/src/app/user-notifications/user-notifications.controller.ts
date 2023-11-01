import { Controller, Delete, Get, HttpStatus, Param, Req, UseGuards, Query } from '@nestjs/common';
import { API_TAG_NAME, NotificationsMessages, NotificationsPath } from './user-notifications.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserNotificationsService } from './user-notifications.service';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { RequestWithUserPayload, UserNotification } from '@backend/shared/shared-types';
import { UserNotificationRdo } from './rdo/user-notification.rdo';
import { NotificationsQuery } from '@backend/shared-quieries';

@ApiTags(API_TAG_NAME)
@Controller(NotificationsPath.Main)
export class UserNotificationsController {
  constructor(
    private readonly notificationsService: UserNotificationsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NotificationsMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async showNotifications(@Req() {user}: RequestWithUserPayload, @Query() query:NotificationsQuery) {
    const{sub} = user;
    const notificationsInfo = await this.notificationsService.showNotifications(sub, query);
    return notificationsInfo.map((item:UserNotification)=>fillObject(UserNotificationRdo, item));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: NotificationsMessages.Remove,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(NotificationsPath.Id)
  public async deleteNotification(@Param('id') id:number, @Req() {user}: RequestWithUserPayload) {
    const{sub} = user;
    return await this.notificationsService.removeNotification(id, sub);
  }

}
