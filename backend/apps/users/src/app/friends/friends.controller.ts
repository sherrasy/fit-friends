import { Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { API_TAG_NAME, FriendsMessages, FriendsPath } from './friends.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@backend/util/util-core';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { UserRoleInterceptor } from '../user-info/interceptors/user-role.interceptor';
import { FriendsService } from './friends.service';

@ApiTags(API_TAG_NAME)
@Controller(FriendsPath.Main)
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: FriendsMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post(FriendsPath.Id)
  public async addFriend( @Param('id') id:number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const newFriend = await this.friendsService.addFriend(id,userId);
    return newFriend;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FriendsMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async showFriends(@Req() {user}: RequestWithUserPayload) {
    const{sub, role} = user;
    const friendsInfo = await this.friendsService.showFriends(sub,role);
    return friendsInfo;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FriendsMessages.Remove,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(FriendsPath.Id)
  public async deleteFriend(@Param('id') id:number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.friendsService.removeFriend(id, userId);
  }
}
