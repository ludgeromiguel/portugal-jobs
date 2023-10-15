import { FastifyInstance } from 'fastify';

import PrismaAnunciosRepository from '@repositories/implementations/PrismaAnunciosRepository';
import PrismaUsersRepository from '@repositories/implementations/PrismaUsersRepository';
import GetManyAnunciosCase from './GetManyAnunciosCase';
import GetManyAnunciosController from './GetManyAnunciosController';
import GetManyAnunciosVerifications from './GetManyAnunciosVerifications';

const getManyAnuncios = (server: FastifyInstance): GetManyAnunciosController => {
  const userRepository = new PrismaUsersRepository(server.prisma);
  const anuncioRepository = new PrismaAnunciosRepository(server.prisma);

  const getManyAnunciosVerifications = new GetManyAnunciosVerifications();

  const getManyAnunciosCase = new GetManyAnunciosCase(
    userRepository,
    anuncioRepository,
  );

  return new GetManyAnunciosController(
    getManyAnunciosVerifications,
    getManyAnunciosCase,
  );
};

export default getManyAnuncios;
