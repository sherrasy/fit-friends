import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, UserInfoError, UserInfoMessages, UserInfoPath } from './user-info.constant';
import { UserInfoService } from './user-info.service';
import { adaptRdoUserInfo } from '../utils/adapt-rdo-user-info';

@ApiTags(API_TAG_NAME)
@Controller(UserInfoPath.Main)
  export class UserInfoController {
    constructor(
      private readonly userInfoService: UserInfoService,
    ) {}

    @ApiResponse({
      status: HttpStatus.OK,
      description: UserInfoMessages.UserFound
    })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: UserInfoError.EmptyList
    })
    @Get(UserInfoPath.Show)
    public async showList() {
      const userList = await this.userInfoService.getUserList()
      return userList.map((user)=>adaptRdoUserInfo(user));
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description: UserInfoMessages.UserFound
    })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: UserInfoError.NotFound
    })
    @Get(UserInfoPath.Id)
    public async showSingle(@Param('id') id: number) {
      const user = await this.userInfoService.findById(id)
      return adaptRdoUserInfo(user);
    }


  }

