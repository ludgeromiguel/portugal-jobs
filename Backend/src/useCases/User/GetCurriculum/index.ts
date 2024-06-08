import { FastifyInstance } from 'fastify';

import GoogleCloudStorageProvider from '@providers/implementations/GoogleCloudStorageProvider';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserGetCurriculumCase from './UserGetCurriculumCase';
import UserGetCurriculumController from './UserGetCurriculumController';
import UserGetCurriculumVerifications from './UserGetCurriculumVerifications';

const userGetCurriculum = (server: FastifyInstance): UserGetCurriculumController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const storageProvider = new GoogleCloudStorageProvider(server.googleCloudStorage);

  const userGetCurriculumVerifications = new UserGetCurriculumVerifications();

  const userGetCurriculumCase = new UserGetCurriculumCase(
    userRepository,
    storageProvider,
  );

  return new UserGetCurriculumController(
    userGetCurriculumVerifications,
    userGetCurriculumCase,
  );
};

export default userGetCurriculum;
