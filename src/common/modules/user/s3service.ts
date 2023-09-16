import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const path = 'photos/';

@Injectable()
export class S3Service {
  private readonly s3Client: any;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadPhoto(buffer: Uint8Array, name: string) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: path + name,
      Body: buffer,
    };
    try {
      return await this.s3Client.send(new PutObjectCommand(uploadParams));
    } catch (err) {
      Logger.error('Error', err);
    }
  }

  async getPhotoURL(name: string): Promise<string> {
    const downloadParams = {
      Bucket: this.bucketName,
      Key: path + name,
    };

    const signedUrl = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand(downloadParams),
    );
    return signedUrl;
  }
}
