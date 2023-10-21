import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { AllowedMimetype, FileError, FileType, MAX_IMAGE_SIZE, } from '../file.constant';
import { extension } from 'mime-types';

@Injectable()
export class ValidateFilePipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const { fieldname, size, mimetype } = value;
    const fileExtension = extension(mimetype);
    const mimetypes = fieldname === FileType.Certificate ? AllowedMimetype.File:AllowedMimetype.Image
    if (!fileExtension || !mimetypes.includes(fileExtension)) {
      throw new BadRequestException(FileError.MimetypeError);
    }

    if (fieldname === FileType.Avatar && size > MAX_IMAGE_SIZE) {
      throw new BadRequestException(FileError.InvalidSize);
    }
    return value;
  }
}
