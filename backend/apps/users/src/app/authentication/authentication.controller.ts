import { Body,  Controller,  HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { API_TAG_NAME, AuthMessages, AuthPath } from './authentication.constant';
import { CreateFullUserDto } from '@backend/shared/shared-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
    public async create(@Body() dto: CreateFullUserDto) {
      const newUser = await this.authService.register(dto);
      // return adaptRdoUserInfo(newUser);
    }

  }

