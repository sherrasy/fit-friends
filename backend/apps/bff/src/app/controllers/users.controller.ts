import { Body, Req, Get, Param, Controller, Post, UseFilters, UseGuards,  UseInterceptors, HttpStatus, UploadedFile, Patch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName, FileType, UserMessages } from '../app.constant';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@backend/shared/shared-dto';
import 'multer';
import FormData from 'form-data'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAuthorizedInterceptor } from '../interceptors/is-authorized.interceptor';
import { CheckJwtAuthGuard } from '../guards/check-jwt-auth.guard';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/user-id.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get(AppPath.CheckLogin)
  public async loginUser(@Req() req: Request, @Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.UserInfo}/${body.userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return {...data};
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
  public async showSingle(@Req() req: Request, @Param('id') id: number) {
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

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.AvatarAdded
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Upload}-${FileType.Avatar}`)
  @UseInterceptors(FileInterceptor(FileType.Avatar))
  public async updateAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData()
    formData.append(FileType.Avatar, Buffer.from(file.buffer), file.originalname)
    const { data:avatarData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${FileType.Avatar}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.UserInfo}/${AppPath.Upload}-${FileType.Avatar}`, {avatarId:avatarData.id}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.PhotoAdded
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Upload}-${FileType.UserPhoto}`)
  @UseInterceptors(FileInterceptor(FileType.UserPhoto))
  public async updateUserPhoto(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData()
    formData.append(FileType.UserPhoto, Buffer.from(file.buffer), file.originalname)
    const { data:photoData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${FileType.UserPhoto}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.UserInfo}/${AppPath.Upload}-${FileType.UserPhoto}`, {photoId:photoData.id}, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.UserUpdate
  })
  @UseGuards(CheckAuthGuard)
  @Patch(`${AppPath.Update}`)
  public async updateUser(@Req() req: Request, @Body() dto:UpdateUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.UserInfo}/${AppPath.Update}`, dto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

}
