import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private readonly client: Client;

  constructor(configService: ConfigService) {
    const options: ClientOptions = {
      endPoint: configService.getOrThrow<string>('MINIO_ENDPOINT'),
      port: configService.getOrThrow<number>('MINIO_PORT'),
      useSSL: configService.getOrThrow<string>('MINIO_USE_SSL') === 'true',
      accessKey: configService.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: configService.getOrThrow<string>('MINIO_SECRET_KEY'),
    };
    this.client = new Client(options);
  }

  public async uploadFile(
    bucket: string,
    objectName: string,
    buffer: Buffer,
    contentType: string,
  ) {
    await this.ensureBucket(bucket);
    return this.client.putObject(bucket, objectName, buffer, undefined, {
      'Content-Type': contentType,
    });
  }

  public async deleteFile(bucket: string, objectName: string) {
    return this.client.removeObject(bucket, objectName);
  }

  private async ensureBucket(bucket: string) {
    const exists = await this.client.bucketExists(bucket);
    if (!exists) {
      await this.client.makeBucket(bucket, 'us-east-1');
    }
  }
}
