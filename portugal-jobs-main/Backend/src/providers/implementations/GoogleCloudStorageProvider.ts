import { Bucket, File } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';

import IStorageProvider from '@providers/IStorageProvider';
import AppError from '@errors/AppError';

class GoogleCloudStorageProvider implements IStorageProvider {
  private readonly bucket: Bucket;

  constructor(bucket: Bucket) {
    this.bucket = bucket;
  }

  private async fileExists(file: File): Promise<boolean> {
    const fileExist = await file.exists();

    return (fileExist && Array.isArray(fileExist) && fileExist[0]);
  }

  async saveFile(filePath: string): Promise<string> {
    const fileID = `${uuid()}.pdf`;

    await this.bucket.upload(filePath, { destination: fileID, gzip: true, public: true });

    return fileID;
  }

  async deleteFile(fileID: string): Promise<boolean> {
    const file = this.bucket.file(fileID);

    if (!(await this.fileExists(file))) return true;

    return !!(await file.delete());
  }

  async getFile(fileID: string): Promise<string> {
    const file = this.bucket.file(fileID);

    if (!(await this.fileExists(file))) throw new AppError('O utilizador não tem um currículo válido', 404);

    return `https://storage.googleapis.com/${this.bucket.name}/${fileID}`;
  }
}

export default GoogleCloudStorageProvider;
