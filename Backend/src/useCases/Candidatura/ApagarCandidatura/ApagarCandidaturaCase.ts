import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUsersRepository from '@repositories/IUsersRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import IApagarCandidaturaDTO from './IApagarCandidaturaDTO';

class ApagarCandidaturaCase {
  constructor(
    private usersRepository: IUsersRepository,
    private candidaturasRepository : ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<IApagarCandidaturaDTO>) {
    const { candidaturaID } = req.params;
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const candidaturaDB = await this.candidaturasRepository.findById(
      candidaturaID,
    );

    if (!candidaturaDB) throw new AppError('Não existe nenhuma candidatura com esse ID', 404);

    if (candidaturaDB.ownerID !== userID) throw new AppError('Não tens permissão de apagar uma candidatura que não é tua', 401);

    if (candidaturaDB.status !== 0) throw new AppError('A empresa já respondeu à tua candidatura, e por isso não podes apagar', 400);

    if (!await this.candidaturasRepository.delete(candidaturaID)) throw new AppError('Ocorreu um erro a apagar a candidatura pretendida', 500);
  }
}

export default ApagarCandidaturaCase;
