import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import AnuncioApagarController from './AnuncioApagarController';
import AnuncioApagarVerifications from './AnuncioApagarVerifications';
import AnuncioApagarCase from './AnuncioApagarCase';

const apagarAnuncio = (server: FastifyInstance): AnuncioApagarController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anunciosRepository = new PrismaAnunciosRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const anuncioApagarVerifications = new AnuncioApagarVerifications();

  const anuncioApagarCase = new AnuncioApagarCase(
    anunciosRepository,
    userRepository,
    candidaturasRepository,
  );

  return new AnuncioApagarController(
    anuncioApagarVerifications,
    anuncioApagarCase,
  );
};

export default apagarAnuncio;
