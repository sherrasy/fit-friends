import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, UserInfoError, UserInfoMessages, UserInfoPath } from './user-info.constant';
import { UserInfoService } from './user-info.service';
import { UserQuery } from '@backend/shared-quieries';

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
    public async showList(@Query() query:UserQuery) {
     return await this.userInfoService.getUserList(query);
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
      return await this.userInfoService.findById(id);
    }

  }

