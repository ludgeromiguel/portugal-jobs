import { FastifyInstance } from 'fastify';

import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import RedisUserTokensRepository from '@repositories/implementations/RedisUserTokensRepository';
import UserCreateAccountController from './UserCreateAccountController';
import UserCreateAccountVerifications from './UserCreateAccountVerifications';
import UserCreateAccountCase from './UserCreateAccountCase';

const userCreateAccount = (server: FastifyInstance): UserCreateAccountController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const userTokensRepository = new RedisUserTokensRepository(server.redis);
  const mailProvider = new ZohoMailProvider({
    host: server.env.MAIL_HOST,
    port: server.env.MAIL_PORT,
    user: server.env.MAIL_USER,
    pass: server.env.MAIL_PASS,
  });

  const userCreateAccountVerifications = new UserCreateAccountVerifications();

  const userCreateAccountCase = new UserCreateAccountCase(
    server,
    mailProvider,
    userRepository,
    userTokensRepository,
  );

  return new UserCreateAccountController(
    userCreateAccountVerifications,
    userCreateAccountCase,
  );
};

export default userCreateAccount;
