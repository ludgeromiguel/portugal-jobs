import { FastifyInstance } from 'fastify';

import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import EditarAnuncioCase from './EditarAnuncioCase';
import EditarAnuncioController from './EditarAnuncioController';
import EditarAnuncioVerifications from './EditarAnuncioVerifications';

const editarAnuncio = (server: FastifyInstance): EditarAnuncioController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anuncioRepository = new PrismaAnunciosRepository(server.prisma);

  const editarAnuncioVerifications = new EditarAnuncioVerifications();

  const editarAnuncioCase = new EditarAnuncioCase(
    userRepository,
    anuncioRepository,
  );

  return new EditarAnuncioController(
    editarAnuncioVerifications,
    editarAnuncioCase,
  );
};

export default editarAnuncio;
