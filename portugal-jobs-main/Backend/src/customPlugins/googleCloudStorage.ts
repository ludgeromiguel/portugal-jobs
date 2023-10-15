import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Storage } from '@google-cloud/storage';
import { resolve } from 'path';

const googleCloudStorage: FastifyPluginAsync = fp(async (server) => {
  const configFilePath = resolve(__dirname, '..', 'config', 'cloudStorageKeyFile.json');

  if (!configFilePath) throw new Error('Google Cloud Storage config file not found');

  const storage = new Storage({ keyFilename: 'src/config/cloudStorageKeyFile.json' });

  const bucket = storage.bucket('portugal-jobs');

  if (!(await bucket.exists())) throw new Error('Google Cloud Storage bucket not found');

  server.decorate('googleCloudStorage', bucket);
});

export default googleCloudStorage;
