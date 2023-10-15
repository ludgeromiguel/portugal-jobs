import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import RedisUserVerificationCodeRepository from '@repositories/implementations/RedisUserVerificationCodeRepository';
import UserVerifyAccountController from './UserVerifyAccountController';
import UserVerifyAccountVerifications from './UserVerifyAccountVerifications';
import UserVerifyAccountCase from './UserVerifyAccountCase';

const userVerifyAccount = (server: FastifyInstance): UserVerifyAccountController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const userVerificationCodeRepository = new RedisUserVerificationCodeRepository(server.redis);

  const userVerifyAccountVerifications = new UserVerifyAccountVerifications();

  const userVerifyAccountCase = new UserVerifyAccountCase(
    userRepository,
    userVerificationCodeRepository,
  );

  return new UserVerifyAccountController(
    userVerifyAccountCase,
    userVerifyAccountVerifications,
  );
};

export default userVerifyAccount;
