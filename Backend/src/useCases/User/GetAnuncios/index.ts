import { FastifyInstance } from 'fastify';

import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import GetUserAnunciosCase from './GetUserAnunciosCase';
import GetUserAnunciosController from './GetUserAnunciosController';
import GetUserAnunciosVerifications from './GetUserAnunciosVerifications';

const getUserAnuncios = (server: FastifyInstance): GetUserAnunciosController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anunciosRepository = new PrismaAnunciosRepository(server.prisma);

  const getUserAnunciosVerifications = new GetUserAnunciosVerifications();

  const getUserAnunciosCase = new GetUserAnunciosCase(
    userRepository,
    anunciosRepository,
  );

  return new GetUserAnunciosController(
    getUserAnunciosVerifications,
    getUserAnunciosCase,
  );
};

export default getUserAnuncios;
