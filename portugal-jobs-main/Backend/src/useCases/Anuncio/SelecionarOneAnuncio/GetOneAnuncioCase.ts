import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import Anuncios from '@entities/Anuncios';
import IUsersRepository from '@repositories/IUsersRepository';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import IGetOneAnuncioDTO from './IGetOneAnuncioDTO';

interface GetOneAnuncioReturnData {
  anuncioDB: Anuncios,
  IsCandidatado: boolean,
}

class GetOneAnuncioCase {
  constructor(
    private usersRepository: IUsersRepository,
    private anunciosRepository : IAnunciosRepository,
    private candidaturasRepository: ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<IGetOneAnuncioDTO>): Promise<GetOneAnuncioReturnData> {
    const { anuncioID } = req.params;
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const anuncioDB = await this.anunciosRepository.findById(anuncioID);
    if (!anuncioDB) throw new AppError('O anúncio não existe!', 404);

    const candidatura = await this.candidaturasRepository
      .getCandidaturaByOwnerAndAnuncio(userID, anuncioID);

    return {
      anuncioDB,
      IsCandidatado: Boolean(candidatura),
    };
  }
}

export default GetOneAnuncioCase;
