import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import AnuncioCreateController from './AnuncioCreateController';
import AnuncioCreateCase from './AnuncioCreateCase';
import AnuncioCreateVerifications from './AnuncioCreateVerification';

const anuncioCreate = (server: FastifyInstance): AnuncioCreateController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anunciosRepository = new PrismaAnunciosRepository(server.prisma);

  const anuncioCreateVerification = new AnuncioCreateVerifications();

  const anuncioCreateCase = new AnuncioCreateCase(
    userRepository,
    anunciosRepository,
  );

  return new AnuncioCreateController(
    anuncioCreateVerification,
    anuncioCreateCase,
  );
};

export default anuncioCreate;
