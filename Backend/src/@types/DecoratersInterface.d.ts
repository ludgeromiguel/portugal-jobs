import IUserTokensRepository from '@repositories/IUserTokensRepository';
import { FastifyInstance } from 'fastify';

interface DecoratersInterface {
  server: FastifyInstance;
  userTokensRepository: IUserTokensRepository;
}
