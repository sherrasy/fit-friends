import {  Req, Controller, Post, UseFilters, UseInterceptors, HttpStatus, UploadedFile, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName, FileType, UserMessages } from '../app.constant';
import 'multer';
import FormData from 'form-data'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags(ControllerName.Uploader)
@Controller(ControllerName.Uploader)
@UseFilters(AxiosExceptionFilter)
export class UploaderController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.AvatarAdded
  })
  @Post(`${AppPath.Upload}-${FileType.Avatar}`)
  @UseInterceptors(FileInterceptor(FileType.Avatar))
  public async uploadAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData()
    formData.append(FileType.Avatar, Buffer.from(file.buffer), file.originalname)
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${FileType.Avatar}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:UserMessages.PhotoAdded
  })
  @Post(`${AppPath.Upload}-${FileType.UserPhoto}`)
  @UseInterceptors(FileInterceptor(FileType.UserPhoto))
  public async uploadUserPhoto(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData()
    formData.append(FileType.UserPhoto, Buffer.from(file.buffer), file.originalname)
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${FileType.UserPhoto}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    return data;
  }

  @Get(`${AppPath.File}/${AppPath.Id}`)
  public async show(@Param('id') fileId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Uploader}/${fileId}`);
    return data;
  }
}
