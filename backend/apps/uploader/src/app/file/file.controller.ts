import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@backend/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@backend/config-uploader';
import { ConfigType } from '@nestjs/config';
import { FilePath, FileType } from './file.constant';
import { MongoidValidationPipe } from '@backend/shared-pipes';
import { ValidateFilePipe } from './pipes/validate-file.pipe';

@Controller(FilePath.Main)
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) { }

  private async createFile(file: Express.Multer.File, type:string){
    const newFile = await this.fileService.saveFile(file, type);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return Object.assign(newFile, { path })
  }

  @Post(`${FilePath.Upload}/${FileType.Avatar}`)
  @UseInterceptors(FileInterceptor(FileType.Avatar))
  public async uploadAvatar(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    const newFile = await this.createFile(file, FileType.Avatar)
    return fillObject(UploadedFileRdo, newFile);
  }

  @Post(`${FilePath.Upload}/${FileType.UserPhoto}`)
  @UseInterceptors(FileInterceptor(FileType.UserPhoto))
  public async uploadUserPhoto(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    const newFile = await this.createFile(file, FileType.UserPhoto)
    return fillObject(UploadedFileRdo, newFile);
  }

  @Post(`${FilePath.Upload}/${FileType.WorkoutPhoto}`)
  @UseInterceptors(FileInterceptor(FileType.WorkoutPhoto))
  public async uploadWorkoutPhoto(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    const newFile = await this.createFile(file, FileType.WorkoutPhoto)
    return fillObject(UploadedFileRdo, newFile);
  }

  @Post(`${FilePath.Upload}/${FileType.Certificate}`)
  @UseInterceptors(FileInterceptor(FileType.Certificate))
  public async uploadCertificate(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    const newFile = await this.createFile(file, FileType.Certificate)
    return fillObject(UploadedFileRdo, newFile);
  }

  @Post(`${FilePath.Upload}/${FileType.Video}`)
  @UseInterceptors(FileInterceptor(FileType.Video))
  public async uploadVideo(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    const newFile = await this.createFile(file, FileType.Video)
    return fillObject(UploadedFileRdo, newFile);
  }

  @Get(FilePath.Id)
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
