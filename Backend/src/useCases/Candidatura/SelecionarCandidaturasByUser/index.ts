import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import SelecionarCandidaturasByUserController from './SelecionarCandidaturasByUserController';
import SelecionarCandidaturasByUserVerifications from './SelecionarCandidaturasByUserVerifications';
import SelecionarCandidaturasByUserCase from './SelecionarCandidaturasByUserCase';

const selecionarCandidaturasbyUser = (server: FastifyInstance):
SelecionarCandidaturasByUserController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const selecionarCandidaturasByUserVerifications = new
  SelecionarCandidaturasByUserVerifications();

  const selecionarCandidaturasByUserCase = new SelecionarCandidaturasByUserCase(
    userRepository,
    candidaturasRepository,
  );

  return new SelecionarCandidaturasByUserController(
    selecionarCandidaturasByUserVerifications,
    selecionarCandidaturasByUserCase,
  );
};

export default selecionarCandidaturasbyUser;
