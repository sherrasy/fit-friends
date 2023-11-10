import { Body, Req, Get, Param, Controller, Post, UseFilters, UseGuards, UploadedFile, UseInterceptors, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName, UserMessages } from '../app.constant';
import { MongoidValidationPipe } from '@backend/shared-pipes';
import { CreateUserDto, LoginUserDto } from '@backend/shared/shared-dto';
import 'multer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { IsAuthorizedInterceptor } from '../interceptors/is-authorized.interceptor';
import { CheckJwtAuthGuard } from '../guards/check-jwt-auth.guard';

@ApiTags(ControllerName.User)
@Controller(ControllerName.User)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status:HttpStatus.CREATED,
    description:UserMessages.Register
  })
  @Post(AppPath.Register)
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Register}`, createUserDto);
    return data;
  }

  @UseGuards(CheckJwtAuthGuard)
  @UseInterceptors(IsAuthorizedInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.Login
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessages.InvalidData,
  })
  @Post(AppPath.Login)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Login}`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessages.NotFound
  })
  @Get(AppPath.Id)
  public async showSingle(@Req() req: Request, @Param('id') id: MongoidValidationPipe) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.UserInfo}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.Refresh
  })
  @Post(AppPath.Refresh)
  public async refreshtoken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Refresh}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Post(AppPath.Revoke)
  public async revokeToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/${AppPath.Revoke}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

}
