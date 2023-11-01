import { uploaderConfig } from '@backend/config-uploader';
import { WritedFile } from '@backend/shared/shared-types';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { FORMAT_PATTERN, FileError } from './file.constant';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository
  ) {}

  private async writeFile(
    file: Express.Multer.File,
    type: string
  ): Promise<WritedFile> {
    const [year, month] = dayjs().format(FORMAT_PATTERN).split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    if (!fileExtension) {
      throw new BadRequestException(FileError.MimetypeError);
    }
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}/${type}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File, type: string) {
    const writedFile = await this.writeFile(file, type);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`${FileError.MimetypeError} (${fileId})`);
    }

    return existFile;
  }
}
