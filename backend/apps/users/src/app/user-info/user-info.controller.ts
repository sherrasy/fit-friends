import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, UserInfoError, UserInfoMessages, UserInfoPath } from './user-info.constant';
import { UserInfoService } from './user-info.service';
import { UserQuery } from '@backend/shared-quieries';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { UserRdo } from './rdo/user.rdo';

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
    @UseGuards(JwtAuthGuard)
    @Get(UserInfoPath.Show)
    public async showList(@Query() query:UserQuery) {
     const users = await this.userInfoService.getUserList(query);
     return users.map((user)=>fillObject(UserRdo, user))
    }

    @ApiResponse({
      status: HttpStatus.OK,
      description: UserInfoMessages.UserFound
    })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: UserInfoError.NotFound
    })
    @UseGuards(JwtAuthGuard)
    @Get(UserInfoPath.Id)
    public async showSingle(@Param('id') id: number) {
      const user =  await this.userInfoService.findById(id);
      return fillObject(UserRdo, user)
    }

  }

