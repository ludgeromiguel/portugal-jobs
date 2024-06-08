import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import AppError from '@errors/AppError';
import Candidaturas from '@entities/Candidaturas';
import IAnuncioCandidatarDTO from './IAnuncioCandidatarDTO';

class AnuncioCandidatarCase {
  constructor(
    private usersRepository: IUsersRepository,
    private anunciosRepository : IAnunciosRepository,
    private candidaturasRepository : ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<IAnuncioCandidatarDTO>): Promise<Candidaturas> {
    const { anuncioID } = req.params;
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);
    if (!userDB.curriculo) throw new AppError('Não tens nenhum currículo!', 400);

    const anuncioDB = await this.anunciosRepository.findById(anuncioID);
    if (!anuncioDB) throw new AppError('O anúncio não existe!', 404);
    if (anuncioDB.ownerID === userID) throw new AppError('Não te podes candidatar ao teu própio anúncio!', 400);

    let candidaturaDB = await this.candidaturasRepository.getCandidaturaByOwnerAndAnuncio(
      userID,
      anuncioID,
    );
    if (candidaturaDB) throw new AppError('Já fez uma candidatura a este anúncio!', 400);

    const CandidaturaClass = new Candidaturas({
      anuncioID,
      ownerID: userID,
    });

    candidaturaDB = await this.candidaturasRepository.create(CandidaturaClass);
    if (!candidaturaDB) throw new AppError('Ocorreu um erro a candidatar ao anúncio!', 500);

    return candidaturaDB;
  }
}

export default AnuncioCandidatarCase;
