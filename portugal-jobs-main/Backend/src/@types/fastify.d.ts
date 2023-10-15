import { PrismaClient } from '@prisma/client';
import { preHandlerAsyncHookHandler } from 'fastify';
import { Bucket } from '@google-cloud/storage';

/* eslint-disable no-unused-vars */
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    googleCloudStorage: Bucket;
    env: NodeJS.ProcessEnv;
    verifyJwt: (req: FastifyRequest, res: FastifyReply) => preHandlerAsyncHookHandler;
  }

  interface FastifyRequest {
    userID?: string;
    pdfFilePath?: string;
  }
}
