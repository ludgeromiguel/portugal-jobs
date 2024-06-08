import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import RedisUserTokensRepository from '@repositories/implementations/RedisUserTokensRepository';
import UserLoginAccountController from './UserLoginAccountController';
import UserLoginAccountVerifications from './UserLoginAccountVerifications';
import UserLoginAccountCase from './UserLoginAccountCase';

const userLoginAccount = (server: FastifyInstance): UserLoginAccountController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const userTokensRepository = new RedisUserTokensRepository(server.redis);

  const userLoginAccountVerifications = new UserLoginAccountVerifications();

  const userLoginAccountCase = new UserLoginAccountCase(
    server,
    userRepository,
    userTokensRepository,
  );

  return new UserLoginAccountController(
    userLoginAccountVerifications,
    userLoginAccountCase,
  );
};

export default userLoginAccount;
