import { ConfigUploaderModule } from '@backend/config-uploader';
import { getMongooseOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DEFAULT_OPTION_SPACE } from './file/file.constant';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions(DEFAULT_OPTION_SPACE)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
