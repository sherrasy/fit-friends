import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { MONGO_ARGUMENT_TYPE, PipeError } from './pipes.constant';


@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== MONGO_ARGUMENT_TYPE) {
      throw new Error(PipeError.WrongArgumentType)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(PipeError.BadMongoId);
    }

    return value;
  }
}
