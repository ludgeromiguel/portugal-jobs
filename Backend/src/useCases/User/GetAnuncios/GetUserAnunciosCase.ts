import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import Anuncios from '@entities/Anuncios';
import IGetUserAnunciosDTO from './IGetUserAnunciosDTO';

interface GetUserAnuncios {
  anuncios: Anuncios[],
  paginas: number,
  paginaAtual: number,
  nRegistos: number,
}

class GetUserAnunciosCase {
  constructor(
    private usersRepository: IUsersRepository,
    private anunciosRepository: IAnunciosRepository,
  ) {}

  async execute(req: FastifyRequest<IGetUserAnunciosDTO>): Promise<GetUserAnuncios> {
    const { userID } = req;

    const {
      pageSize,
      pageIndex,
    } = req.query;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('Utilizador não encontrado', 404);

    const userAnnounces = await this.anunciosRepository.countAnunciosByUser(userID);
    if (!userAnnounces || userAnnounces === 0) throw new AppError('Você não tem nenhum anúncio', 404);

    const announcePages = Math.ceil(userAnnounces / pageSize);
    if (!announcePages || announcePages === 0) throw new AppError('Não existe nenhuma página', 404);
    if (pageIndex > announcePages) throw new AppError(`Página não encontrada, a página tem de estar entre 1 e ${announcePages}`, 404);

    const announcesDB = await this.anunciosRepository.getUserAnunciosWithPagination(
      userID,
      pageSize,
      pageIndex,
    );
    if (!announcesDB || announcesDB.length === 0) throw new AppError('Ocorreu algum erro, tente novamente mais tarde', 500);

    return {
      anuncios: announcesDB,
      paginas: announcePages,
      paginaAtual: pageIndex,
      nRegistos: userAnnounces,
    };
  }
}

export default GetUserAnunciosCase;
