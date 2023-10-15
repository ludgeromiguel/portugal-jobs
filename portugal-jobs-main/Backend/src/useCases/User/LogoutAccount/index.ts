import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import RedisUserTokensRepository from '@repositories/implementations/RedisUserTokensRepository';
import UserLogoutAccountController from './UserLogoutAccountController';
import UserLogoutAccountCase from './UserLogoutAccountCase';

const userLogouAccount = (server: FastifyInstance): UserLogoutAccountController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const userTokensRepository = new RedisUserTokensRepository(server.redis);

  const userLogoutAccountCase = new UserLogoutAccountCase(
    userRepository,
    userTokensRepository,
  );

  return new UserLogoutAccountController(userLogoutAccountCase);
};

export default userLogouAccount;
