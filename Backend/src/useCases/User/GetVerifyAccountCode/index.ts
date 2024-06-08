import { FastifyInstance } from 'fastify';

import ZohoMailProvider from '@providers/implementations/ZohoMailProvider';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import RedisUserVerificationCodeRepository from '@repositories/implementations/RedisUserVerificationCodeRepository';
import UserGetVerifyAccountcodeCase from './UserGetVerifyAccountCodeCase';
import UserGetVerifyAccountCodeController from './UserGetVerifyAccountCodeController';

const userGetVerifyAccountcode = (server: FastifyInstance): UserGetVerifyAccountCodeController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const userVerificationCodeRepository = new RedisUserVerificationCodeRepository(server.redis);
  const mailProvider = new ZohoMailProvider({
    host: server.env.MAIL_HOST,
    port: server.env.MAIL_PORT,
    user: server.env.MAIL_USER,
    pass: server.env.MAIL_PASS,
  });

  const userGetVerifyAccountCodeCase = new UserGetVerifyAccountcodeCase(
    server,
    mailProvider,
    userRepository,
    userVerificationCodeRepository,
  );

  return new UserGetVerifyAccountCodeController(userGetVerifyAccountCodeCase);
};

export default userGetVerifyAccountcode;
