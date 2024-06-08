import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import AnuncioCandidatarController from './AnuncioCandidatarController';
import AnuncioCandidatarVerifications from './AnuncioCandidatarVerification';
import AnuncioCandidatarCase from './AnuncioCandidatarCase';

const candidatarAnuncio = (server: FastifyInstance): AnuncioCandidatarController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anunciosRepository = new PrismaAnunciosRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const anuncioCandidatarVerifications = new AnuncioCandidatarVerifications();

  const anuncioCandidatarCase = new AnuncioCandidatarCase(
    userRepository,
    anunciosRepository,
    candidaturasRepository,
  );

  return new AnuncioCandidatarController(
    anuncioCandidatarVerifications,
    anuncioCandidatarCase,
  );
};

export default candidatarAnuncio;
