import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MinioService } from './minio.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MINIO_PORT: Joi.number().required(),
        MINIO_USE_SSL: Joi.string().required(),
        MINIO_ENDPOINT: Joi.string().required(),
        MINIO_ACCESS_KEY: Joi.string().required(),
        MINIO_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
