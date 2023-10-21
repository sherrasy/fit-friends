import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@backend/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@backend/util/util-core';
import { DEFAULT_OPTION_SPACE } from './file/file.constant';

@Module({
  imports: [FileModule,  ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(DEFAULT_OPTION_SPACE)
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
