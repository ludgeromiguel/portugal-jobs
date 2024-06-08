import { FastifyInstance } from 'fastify';

import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import GetOneAnuncioController from './IGetOneAnuncioController';
import GetOneAnuncioVerifications from './GetOneAnuncioVerifications';
import GetOneAnuncioCase from './GetOneAnuncioCase';

const getOneAnuncio = (server: FastifyInstance): GetOneAnuncioController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anuncioRepository = new PrismaAnunciosRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const getOneAnuncioVerifications = new GetOneAnuncioVerifications();

  const getOneAnuncioCase = new GetOneAnuncioCase(
    userRepository,
    anuncioRepository,
    candidaturasRepository,
  );

  return new GetOneAnuncioController(
    getOneAnuncioVerifications,
    getOneAnuncioCase,
  );
};

export default getOneAnuncio;
