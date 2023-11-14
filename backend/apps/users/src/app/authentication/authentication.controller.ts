import { CreateUserDto } from '@backend/shared/shared-dto';
import {
  RequestWithUser,
  RequestWithUserPayload,
  TokenAuth,
} from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyService } from '../notify/notify.service';
import { UserRdo } from '../user-info/rdo/user.rdo';
import {
  API_TAG_NAME,
  AuthError,
  AuthMessage,
  AuthPath,
} from './authentication.constant';
import { AuthenticationService } from './authentication.service';
import { CheckJwtAuthGuard } from './guards/check-jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@ApiTags(API_TAG_NAME)
@Controller(AuthPath.Main)
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthMessage.Register,
  })
  @Post(AuthPath.Register)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthMessage.Login,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthError.InvalidData,
  })
  @UseGuards(CheckJwtAuthGuard, LocalAuthGuard)
  @Post(AuthPath.Login)
  public async login(
    @Req() { user }: RequestWithUser,
    @Body() tokenAuth?: TokenAuth
  ) {
    return await this.authService.createUserToken(user, tokenAuth);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthMessage.Refresh,
  })
  @Post(AuthPath.Refresh)
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(AuthPath.Check)
  public async checkToken(@Req() { user: payload }: RequestWithUserPayload) {
    return payload;
  }

  @UseGuards(CheckJwtAuthGuard)
  @Post(AuthPath.CheckAuth)
  public async checkAuthorized(@Req() { user: payload }: RequestWithUserPayload) {
    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @Post(AuthPath.Revoke)
  @HttpCode(HttpStatus.NO_CONTENT)
  async revokeToken(@Req() { user }: RequestWithUserPayload) {
    return this.authService.revokeToken(user.sub);
  }
}
