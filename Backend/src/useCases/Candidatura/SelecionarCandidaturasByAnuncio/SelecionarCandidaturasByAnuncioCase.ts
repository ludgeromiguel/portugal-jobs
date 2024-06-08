import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUsersRepository from '@repositories/IUsersRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import Candidaturas from '@entities/Candidaturas';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import ISelecionarCandidaturasByAnuncioDTO from './ISelecionarCandidaturasByAnuncioDTO';

type CandidaturasWithUser = Candidaturas &
{ ownerFirstName: string, ownerLastName: string, ownerUsername: string };

interface GetManyCandidaturasReturnData {
  candidaturas: CandidaturasWithUser[],
  paginas: number,
  paginaAtual: number,
  nRegistos: number,
}

class SelecionarCandidaturasByAnuncioCase {
  constructor(
    private usersRepository: IUsersRepository,
    private anunciosRepository: IAnunciosRepository,
    private candidaturasRepository : ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<ISelecionarCandidaturasByAnuncioDTO>):
  Promise<GetManyCandidaturasReturnData> {
    const { anuncioID } = req.params;
    const { userID } = req;
    const {
      pageIndex,
      pageSize,
    } = req.query;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const anuncioDB = await this.anunciosRepository.findById(anuncioID);
    if (!anuncioDB) throw new AppError('Não existe nenhum anúncio com esse ID', 404);

    if (anuncioDB.ownerID !== userID) throw new AppError('Não tens permissão de ver as candidaturas de um anúncio que não é teu', 401);

    const nRegistos = await this.candidaturasRepository.countCandidaturasByAnuncio(anuncioID);
    if (!nRegistos || nRegistos === 0) throw new AppError('Não existem candidaturas', 404);

    const paginas = Math.ceil(nRegistos / pageSize);
    if (pageIndex > paginas) throw new AppError('Número de página inválida.', 404);

    const offset = (pageIndex * pageSize) - pageSize;

    const candidaturasDB: Candidaturas[] = await
    this.candidaturasRepository.getCandidaturasByAnuncioWithPagination(
      anuncioID,
      offset,
      pageSize,
    );

    if (!candidaturasDB) throw new AppError('Ocorreu um erro a selecionar as candidaturas', 500);

    const candidaturasWithUser: CandidaturasWithUser[] = [];

    for (const candidatura of candidaturasDB) {
      const { owner, ...candidaturaData } = candidatura;

      candidaturasWithUser.push({
        ...candidaturaData,
        ownerFirstName: owner.firstName,
        ownerLastName: owner.lastName,
        ownerUsername: owner.username,
      });
    }

    return {
      candidaturas: candidaturasWithUser,
      paginas,
      paginaAtual: pageIndex,
      nRegistos,
    };
  }
}

export default SelecionarCandidaturasByAnuncioCase;
