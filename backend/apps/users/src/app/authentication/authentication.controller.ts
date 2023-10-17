import { Body,  Controller,  HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@backend/shared/shared-dto';
import { UserRdo } from '../user-info/rdo/user.rdo';
import { fillObject } from '@backend/util/util-core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { RequestWithUser } from '@backend/shared/shared-types';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(API_TAG_NAME)
@Controller(AuthPath.Main)
  export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService,
    ) {}

    @ApiResponse({
      status:HttpStatus.CREATED,
      description:AuthMessages.Register
    })
    @Post(AuthPath.Register)
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      return fillObject(UserRdo, newUser);
    }

    @ApiResponse({
      type: LoggedUserRdo,
      status: HttpStatus.OK,
      description: AuthMessages.Login
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: AuthError.InvalidData,
    })
    @UseGuards(LocalAuthGuard)
    @Post(AuthPath.Login)
    public async login(@Req() {user}: RequestWithUser) {
    return await this.authService.createUserToken(user);
    }

    // @HttpCode(HttpStatus.OK)
    // @ApiResponse({
    //   status: HttpStatus.OK,
    //   description:AuthMessages.Refresh
    // })
    // @Post(AuthPath.Refresh)
    // @UseGuards(JwtRefreshGuard)
    // public async refreshToken(@Req() { user }: RequestWithUser) {
    //   return this.authService.createUserToken(user);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Post(AuthPath.Check)
    // public async checkToken(@Req() { user: payload }: RequestWithUserPayload) {
    //   return payload;
    // }
    // @ApiResponse({
    //   status: HttpStatus.OK,
    //   description:AuthMessages.AvatarAdded
    // })
    // @UseGuards(JwtAuthGuard)
    // @Post(AuthPath.UpdateAvatar)
    // public async updateAvatar(@Req() { user }: RequestWithUserPayload, @Body('avatarId') avatarId:string) {
    //   return this.authService.updateAvatar(user.sub, avatarId);
    // }
  }

