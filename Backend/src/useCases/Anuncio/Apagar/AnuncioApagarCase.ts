import { FastifyRequest } from 'fastify';

import IAnunciosRepository from '@repositories/IAnunciosRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import IAnuncioApagarDTO from './IAnuncioApagarDTO';

class AnuncioApagarCase {
  constructor(
    private anuncioRepository: IAnunciosRepository,
    private usersRepository: IUsersRepository,
    private candidaturasRepository: ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<IAnuncioApagarDTO>): Promise<void> {
    const { anuncioID } = req.params;
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('Utilizador não existe', 401);

    const anuncioDB = await this.anuncioRepository.findById(anuncioID);
    if (!anuncioDB) throw new AppError('Anúncio não existe', 404);

    if (anuncioDB.ownerID !== userDB.id) throw new AppError('Não tens permissões para apagar este anúncio', 401);

    if (!(await this.candidaturasRepository.deleteByAnuncioID(req.params.anuncioID))) throw new AppError('Não foi possível apagar as candidaturas referentes ao anúncio', 500);

    if (!(await this.anuncioRepository.delete(anuncioDB.id))) throw new AppError('Não foi possível apagar o anúncio', 500);
  }
}

export default AnuncioApagarCase;
