import { UserRoleInterceptor } from '@backend/shared-interceptors';
import { RequestWithUserPayload, User } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Controller,
  Delete,
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
import { UserRdo } from '../user-info/rdo/user.rdo';
import { API_TAG_NAME, FriendsMessage, FriendsPath } from './friends.constant';
import { FriendsService } from './friends.service';
import { FriendRdo } from './rdo/friend.rdo';
import { DefaultQuery } from '@backend/shared-quieries';

@ApiTags(API_TAG_NAME)
@Controller(FriendsPath.Main)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: FriendsMessage.Add,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post(FriendsPath.Id)
  public async addFriend(
    @Param('id') id: number,
    @Req() { user }: RequestWithUserPayload
  ) {
    const userId = user.sub;
    const newFriend = await this.friendsService.addFriend(id, userId);
    return fillObject(FriendRdo, newFriend);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FriendsMessage.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async showFriends(@Req() { user }: RequestWithUserPayload, @Query() query:DefaultQuery) {
    const { sub, role } = user;
    const friendsInfo = await this.friendsService.showFriends(sub, role, query);
    return friendsInfo.map((item: User) => fillObject(UserRdo, item));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FriendsMessage.Remove,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(FriendsPath.Id)
  public async deleteFriend(
    @Param('id') id: number,
    @Req() { user }: RequestWithUserPayload
  ) {
    const {sub:userId, role} = user;
    return await this.friendsService.removeFriend(id, userId, role);
  }
}
