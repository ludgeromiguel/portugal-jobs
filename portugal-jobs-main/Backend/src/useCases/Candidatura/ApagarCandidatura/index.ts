import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import ApagarCandidaturaController from './ApagarCandidaturaController';
import ApagarCandidaturaVerifications from './ApagarCandidaturaVerifications';
import ApagarCandidaturaCase from './ApagarCandidaturaCase';

const apagarCandidatura = (server: FastifyInstance): ApagarCandidaturaController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const apagarCandidaturaVerifications = new ApagarCandidaturaVerifications();

  const apagarCandidaturaCase = new ApagarCandidaturaCase(
    userRepository,
    candidaturasRepository,
  );

  return new ApagarCandidaturaController(
    apagarCandidaturaVerifications,
    apagarCandidaturaCase,
  );
};

export default apagarCandidatura;
