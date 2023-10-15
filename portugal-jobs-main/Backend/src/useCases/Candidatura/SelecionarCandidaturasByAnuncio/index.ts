import { FastifyInstance } from 'fastify';

import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import PrismaCandidaturasRepository from '@repositories/implementations/PrismaCandidaturasRepository';
import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import SelecionarCandidaturasByAnuncioController from './SelecionarCandidaturasByAnuncioController';
import SelecionarCandidaturasByAnuncioVerifications from './SelecionarCandidaturasByAnuncioVerifications';
import SelecionarCandidaturasByAnuncioCase from './SelecionarCandidaturasByAnuncioCase';

const selecionarCandidaturasbyAnuncio = (server: FastifyInstance):
SelecionarCandidaturasByAnuncioController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anunciosRepository = new PrismaAnunciosRepository(server.prisma);
  const candidaturasRepository = new PrismaCandidaturasRepository(server.prisma);

  const selecionarCandidaturasByAnuncioVerifications = new
  SelecionarCandidaturasByAnuncioVerifications();

  const selecionarCandidaturasByAnuncioCase = new SelecionarCandidaturasByAnuncioCase(
    userRepository,
    anunciosRepository,
    candidaturasRepository,
  );

  return new SelecionarCandidaturasByAnuncioController(
    selecionarCandidaturasByAnuncioVerifications,
    selecionarCandidaturasByAnuncioCase,
  );
};

export default selecionarCandidaturasbyAnuncio;
