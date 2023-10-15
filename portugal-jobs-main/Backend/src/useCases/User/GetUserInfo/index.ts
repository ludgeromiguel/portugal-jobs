import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import UserGetUserInfoCase from './UserGetUserInfoCase';
import UserGetUserInfoController from './UserGetUserInfoController';

const userGetUserInfo = (server: FastifyInstance): UserGetUserInfoController => {
  const userRepository = new PrismaUsersRepository(server.prisma);

  const userGetUserInfoCase = new UserGetUserInfoCase(userRepository);

  return new UserGetUserInfoController(userGetUserInfoCase);
};

export default userGetUserInfo;
