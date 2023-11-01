import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import {
  AllowedMimetype,
  FileError,
  FileType,
  MAX_IMAGE_SIZE,
} from '../file.constant';

@Injectable()
export class ValidateFilePipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const { fieldname, size, mimetype } = value;
    const fileExtension = extension(mimetype);
    const mimetypes =
      fieldname === FileType.Certificate
        ? AllowedMimetype.File
        : fieldname === FileType.Video
        ? AllowedMimetype.Video
        : AllowedMimetype.Image;
    if (!fileExtension || !mimetypes.includes(fileExtension)) {
      throw new BadRequestException(FileError.MimetypeError);
    }

    if (fieldname === FileType.Avatar && size > MAX_IMAGE_SIZE) {
      throw new BadRequestException(FileError.InvalidSize);
    }
    return value;
  }
}
