// import { Body, Req, Controller, Get, HttpStatus,HttpCode, Param, Post, UseGuards } from '@nestjs/common';
// import { AuthenticationService } from './authentication.service';
// import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
// import { API_TAG_NAME, AuthError, AuthMessages, AuthPath } from './authentication.constant';
// import { UserRdo } from './rdo/user.rdo';
// import { LoggedUserRdo } from './rdo/logged-user.rdo';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
// import { CreateFullUserDto } from '@backend/shared/shared-dto';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { RequestWithUser, RequestWithUserPayload } from '@backend/shared/shared-types';

// @ApiTags(API_TAG_NAME)
// @Controller(AuthPath.Main)
//   export class AuthenticationController {
//     constructor(
//       private readonly authService: AuthenticationService,
//     ) {}

//     // @ApiResponse({
//     //   status:HttpStatus.CREATED,
//     //   description:AuthMessages.Register
//     // })
//     // @Post(AuthPath.Register)
//     // public async create(@Body() dto: CreateFullUserDto) {
//     //   const newUser = await this.authService.register(dto);
//     //   const { email, name } = newUser;
//     //   return fillObject(UserRdo, newUser);
//     // }

//     // @ApiResponse({
//     //   type: LoggedUserRdo,
//     //   status: HttpStatus.OK,
//     //   description: AuthMessages.Login
//     // })
//     // @ApiResponse({
//     //   status: HttpStatus.UNAUTHORIZED,
//     //   description: AuthError.InvalidData,
//     // })
//     // @UseGuards(LocalAuthGuard)
//     // @Post(AuthPath.Login)
//     // public async login(@Req() {user}: RequestWithUser) {
//     // return await this.authService.createUserToken(user);
//     // }

//     // @ApiResponse({
//     //   type: UserRdo,
//     //   status: HttpStatus.OK,
//     //   description: AuthMessages.UserFound
//     // })
//     // @Get(AuthPath.Id)
//     // public async show(@Param('id') id: string) {
//     //   const existUser = await this.authService.getUser(id);
//     //   return fillObject(UserRdo, existUser);
//     // }

//     // @HttpCode(HttpStatus.OK)
//     // @ApiResponse({
//     //   status: HttpStatus.OK,
//     //   description:AuthMessages.Refresh
//     // })
//     // @Post(AuthPath.Refresh)
//     // @UseGuards(JwtRefreshGuard)
//     // public async refreshToken(@Req() { user }: RequestWithUser) {
//     //   return this.authService.createUserToken(user);
//     // }

//     // @UseGuards(JwtAuthGuard)
//     // @Post(AuthPath.Check)
//     // public async checkToken(@Req() { user: payload }: RequestWithUserPayload) {
//     //   return payload;
//     // }

//     // @ApiResponse({
//     //   status: HttpStatus.OK,
//     //   description:AuthMessages.AvatarAdded
//     // })
//     // @UseGuards(JwtAuthGuard)
//     // @Post(AuthPath.UpdateAvatar)
//     // public async updateAvatar(@Req() { user }: RequestWithUserPayload, @Body('avatarId') avatarId:string) {
//     //   return this.authService.updateAvatar(user.sub, avatarId);
//     // }
//   }

