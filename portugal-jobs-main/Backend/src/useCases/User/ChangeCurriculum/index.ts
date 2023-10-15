import { FastifyInstance } from 'fastify';

import GoogleCloudStorageProvider from '@providers/implementations/GoogleCloudStorageProvider';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserChangeCurriculumCase from './UserChangeCurriculumCase';
import UserChangeCurriculumVerifications from './UserChangeCurriculumVerifications';
import UserChangeCurriculumController from './UserChangeCurriculumController';

const userChangeCurriculum = (server: FastifyInstance): UserChangeCurriculumController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const googleCloudStorageProvider = new GoogleCloudStorageProvider(server.googleCloudStorage);

  const userChangeCurriculumVerifications = new UserChangeCurriculumVerifications();

  const userchangeCurriculumCase = new UserChangeCurriculumCase(
    userRepository,
    googleCloudStorageProvider,
  );

  return new UserChangeCurriculumController(
    userChangeCurriculumVerifications,
    userchangeCurriculumCase,
  );
};

export default userChangeCurriculum;
