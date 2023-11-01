import { File } from '@backend/shared/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FILE_COLLECTION_NAME } from './file.constant';

@Schema({
  collection: FILE_COLLECTION_NAME,
  timestamps: true,
})
export class FileModel extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true,
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public size: number;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
