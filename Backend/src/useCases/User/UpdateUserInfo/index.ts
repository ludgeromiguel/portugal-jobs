import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UpdateUserInfoController from './UpdateUserInfoController';
import UpdateUserInfoCase from './UpdateUserInfoCase';
import UpdateUserInfoVerifications from './UpdateUserInfoVerifications';

const userUpdateUserInfo = (server: FastifyInstance): UpdateUserInfoController => {
  const userRepository = new PrismaUsersRepository(server.prisma);

  const userUpdateInfoVerifications = new UpdateUserInfoVerifications();

  const userUpdateInfoCase = new UpdateUserInfoCase(
    server,
    userRepository,
  );

  return new UpdateUserInfoController(
    userUpdateInfoVerifications,
    userUpdateInfoCase,
  );
};

export default userUpdateUserInfo;
